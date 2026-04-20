import { Route } from "next";
import Link from "next/link";
import { MarketingShell } from "../components/layout/marketing-shell";
import { pricing } from "../lib/data";

const faqs = [
  {
    question: "Can I switch plans any time?",
    answer:
      "Yes. You can move between Free and Premium at any time without losing your historical data.",
  },
  {
    question: "Is there a free trial for Premium?",
    answer:
      "Yes. Premium includes a 7-day trial so users can test analytics, unlimited tracking, and alerts.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support secure card payments for Premium subscriptions, with billing managed from account settings.",
  },
  {
    question: "Do you charge setup or onboarding fees?",
    answer:
      "No. There are no hidden charges, setup fees, or surprise costs beyond the selected plan.",
  },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <section className="relative z-[1] mx-auto max-w-4xl px-4 pt-40 pb-14 text-center sm:px-6 sm:pt-32 sm:pb-16 lg:px-8 lg:pt-36">
        <span className="rounded-full border border-base px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">
          Pricing
        </span>
        <h1 className="mt-4 font-display text-[clamp(30px,6vw,54px)] font-extrabold leading-[1.1] tracking-tight">
          Flexible pricing for every stage
          <br />
          of your financial journey
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          Start free, then upgrade when you want advanced analytics, unlimited
          tracking, and richer reporting.
        </p>
      </section>

      <section className="relative z-[1] mx-auto mb-16 max-w-5xl px-4 sm:mb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-base bg-input/25 p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {pricing.map(
              ({
                name,
                price,
                period,
                color,
                badge,
                features: fs,
                cta,
                href,
                primary,
              }) => (
                <article
                  key={name}
                  className={`relative rounded-2xl bg-transparent p-6 ${badge ? "border border-accent shadow-glow" : "border border-base"}`}
                >
                  {badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                        style={{
                          color,
                          background: `${color}18`,
                          borderColor: `${color}30`,
                        }}
                      >
                        Most popular
                      </span>
                    </div>
                  )}
                  <h2 className="mb-2 font-display text-xl font-extrabold text-text">
                    {name}
                  </h2>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span
                      className="font-display text-4xl font-extrabold"
                      style={{ color }}
                    >
                      {price}
                    </span>
                    <span className="text-[14px] text-muted">{period}</span>
                  </div>
                  <div className="mb-7 flex flex-col gap-2.5">
                    {fs.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2.5 text-[14px] text-muted"
                      >
                        <span className="mt-0.5 shrink-0 text-brand">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={href as Route}
                    className={`block w-full rounded-xl py-3 text-center text-[14px] font-semibold no-underline transition-all ${primary ? "text-white gradient-brand shadow-brand hover:opacity-90" : "border border-base bg-transparent text-muted hover:bg-input"}`}
                  >
                    {cta}
                  </Link>
                </article>
              ),
            )}
          </div>
          <p className="mt-7 text-center text-[13px] text-dim">
            No setup fees, no hidden costs, and cancel any time.
          </p>
        </div>
      </section>

      <section className="relative z-[1] mx-auto mb-20 max-w-6xl px-4 sm:mb-24 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-[clamp(24px,4vw,36px)] font-extrabold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map(({ question, answer }) => (
            <article
              key={question}
              className="rounded-2xl border border-base bg-transparent p-5"
            >
              <h3 className="mb-2 font-display text-[18px] font-bold text-text">
                {question}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
