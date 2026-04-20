import { Route } from "next";
import Link from "next/link";
import { MarketingShell } from "../components/layout/marketing-shell";
import { steps } from "../lib/data";

const setupDetails = [
  {
    duration: "About 1 minute",
    points: [
      "Create an account with email and password.",
      "Confirm profile basics so reports are tailored to your goals.",
    ],
  },
  {
    duration: "About 3 minutes",
    points: [
      "Add your wallets and bank accounts.",
      "Set realistic monthly limits for each spending category.",
    ],
  },
  {
    duration: "Daily use: under 30 seconds",
    points: [
      "Log expenses and income quickly as they happen.",
      "Review live budget status and insights before making new purchases.",
    ],
  },
];

const momentumCards = [
  {
    title: "Daily clarity",
    desc: "Start each day with a simple snapshot of cash flow, balances, and category spend.",
  },
  {
    title: "Smarter spending",
    desc: "Make decisions with context, not guesswork, by seeing where your money patterns shift.",
  },
  {
    title: "Consistent progress",
    desc: "Track savings growth over time and keep momentum with practical weekly habits.",
  },
];

export default function HowItWorkPage() {
  return (
    <MarketingShell>
      <section className="relative z-[1] mx-auto max-w-4xl px-4 pt-40 pb-14 text-center sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36">
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{
            color: "#fbbf24",
            background: "rgba(251,191,36,0.12)",
            borderColor: "rgba(251,191,36,0.3)",
          }}
        >
          How it works
        </span>
        <h1 className="mt-4 font-display text-[clamp(30px,6vw,54px)] font-extrabold leading-[1.1] tracking-tight">
          From setup to control
          <br />
          in three practical steps
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          WealthWise is designed to be simple enough for daily tracking and
          powerful enough for monthly planning.
        </p>
      </section>

      <section className="relative z-[1] mx-auto mb-16 max-w-5xl px-4 sm:mb-20 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {steps.map(({ n, title, desc }, idx) => {
            const detail = setupDetails[idx];
            return (
              <article
                key={n}
                className="rounded-2xl border border-base bg-transparent p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent font-display text-sm font-extrabold text-brand sm:h-14 sm:w-14 sm:text-base"
                    style={{ background: "rgba(74,222,128,0.1)" }}
                  >
                    {n}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="font-display text-[20px] font-bold text-text">
                        {title}
                      </h2>
                      <span className="text-[12px] font-semibold uppercase tracking-wide text-dim">
                        {detail.duration}
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {desc}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {detail.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-[14px] text-muted"
                        >
                          <span className="mt-0.5 shrink-0 text-brand">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative z-[1] mx-auto mb-16 max-w-6xl px-4 sm:mb-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-[clamp(24px,4vw,36px)] font-extrabold tracking-tight">
          What happens after setup
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {momentumCards.map(({ title, desc }) => (
            <article
              key={title}
              className="rounded-2xl border border-base bg-input/20 p-5"
            >
              <h3 className="mb-2 font-display text-[18px] font-bold text-text">
                {title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-[1] mx-auto mb-20 max-w-3xl px-4 text-center sm:mb-24 sm:px-6 lg:px-8">
        <h2 className="font-display text-[clamp(24px,4vw,34px)] font-extrabold tracking-tight">
          Ready to start in minutes?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-muted sm:text-[15px]">
          Set up your account, track your first transaction, and see your full
          financial picture before the day ends.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={"/register" as Route}
            className="rounded-xl px-6 py-3 text-[14px] font-semibold text-white gradient-brand shadow-brand no-underline transition-opacity hover:opacity-90"
          >
            Create free account
          </Link>
          <Link
            href={"/features" as Route}
            className="rounded-xl border border-base bg-transparent px-6 py-3 text-[14px] font-semibold text-muted no-underline transition-all hover:bg-input"
          >
            Explore features
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
