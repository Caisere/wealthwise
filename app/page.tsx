import Link from "next/link";
import { features, pricing, steps } from "./lib/data";
import { Navbar } from "./components/layout/navbar";


export default function LandingPage() {
  return (
    <div className="bg-bg min-h-screen text-text font-body overflow-x-hidden relative">
      {/* NAV */}
      <Navbar />

      {/* Ambient glows */}
      <div
        className="fixed top-0 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-1/4 right-0 translate-x-1/3 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
        }}
      />

      {/* HERO */}
      <section className="text-center px-5 pt-24 pb-20 max-w-3xl mx-auto relative z-[1]">
        <div className="animate-fade-up mb-5">
          <span
            className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border font-body"
            style={{
              color: "#4ade80",
              background: "rgba(74,222,128,0.12)",
              borderColor: "rgba(74,222,128,0.3)",
            }}
          >
            Now with AI spending insights ✦
          </span>
        </div>
        <h1
          className="animate-fade-up-1 font-display font-extrabold text-[clamp(42px,6vw,68px)] leading-[1.1] tracking-[-2px] mb-6"
          style={{
            background:
              "linear-gradient(135deg, #f1f5f9 0%, #f1f5f9 50%, #4ade80 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your money,
          <br />
          finally making sense.
        </h1>
        <p className="animate-fade-up-2 text-[18px] text-muted leading-relaxed max-w-lg mx-auto mb-10">
          Track income, expenses and budgets across all your accounts. Know
          exactly where every naira goes — in real time.
        </p>
        <div className="animate-fade-up-3 flex gap-3.5 justify-center flex-wrap">
          <Link
            href="/register"
            className="px-8 py-3.5 text-[15px] font-semibold rounded-xl gradient-brand text-white shadow-brand hover:opacity-90 transition-opacity no-underline"
          >
            Start for free — no card needed
          </Link>
        </div>
        <p className="animate-fade-up-4 text-[12px] text-dim mt-5">
          Join 12,000+ Nigerians who track their money with WealthWise
        </p>
      </section>

      {/* PREVIEW */}
      <div className="max-w-4xl mx-auto px-5 mb-24 animate-float relative z-[1]">
        <div className="bg-transparent border border-base rounded-2xl p-6 shadow-glow">
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              ["Net Worth", "₦1,284,500", "+12.4%", true],
              ["Income", "₦420,000", "+20%", true],
              ["Expenses", "₦178,000", "-26%", false],
              ["Savings", "₦242,000", "57.6%", true],
            ].map(([l, v, c, up]) => (
              <div
                key={l as string}
                className="bg-input rounded-2xl p-4 border border-base"
              >
                <div className="text-[11px] text-dim mb-1.5 uppercase tracking-wide">
                  {l}
                </div>
                <div className="font-display text-[18px] font-extrabold text-text mb-1">
                  {v}
                </div>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${up ? "bg-[rgba(74,222,128,0.15)] text-brand" : "bg-[rgba(248,113,113,0.15)] text-danger"}`}
                >
                  {up ? "↑" : "↓"} {c}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-input rounded-full overflow-hidden">
            <div className="w-[42%] h-full gradient-brand rounded-full" />
          </div>
          <div className="text-[12px] text-dim mt-2">
            Food budget: ₦42,000 / ₦60,000 used
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="max-w-[1100px] mx-auto px-5 mb-24 relative z-[1]">
        <div className="text-center mb-14">
          <span
            className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border"
            style={{
              color: "#38bdf8",
              background: "rgba(56,189,248,0.12)",
              borderColor: "rgba(56,189,248,0.3)",
            }}
          >
            Features
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mt-4">
            Everything you need to own your finances
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="landing-card bg-transparent border border-base rounded-2xl p-7 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-display text-[17px] font-bold mb-2.5 text-text">
                {title}
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-2xl mx-auto px-5 mb-24 text-center relative z-[1]">
        <span
          className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border"
          style={{
            color: "#fbbf24",
            background: "rgba(251,191,36,0.12)",
            borderColor: "rgba(251,191,36,0.3)",
          }}
        >
          How it works
        </span>
        <h2 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight my-4 mb-14">
          Up and running in 3 steps
        </h2>
        <div className="flex flex-col gap-10 text-left">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="flex gap-7 items-start">
              <div
                className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center font-display text-base font-extrabold text-brand border border-accent"
                style={{ background: "rgba(74,222,128,0.1)" }}
              >
                {n}
              </div>
              <div className="pt-2">
                <h3 className="font-display text-[18px] font-bold mb-2 text-text">
                  {title}
                </h3>
                <p className="text-[15px] text-muted leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-3xl mx-auto px-5 mb-24 relative z-[1]">
        <div className="text-center mb-14">
          <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-base text-muted">
            Pricing
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mt-4">
            Simple, honest pricing
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5">
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
              <div
                key={name}
                className={`bg-transparent rounded-2xl p-8 relative ${badge ? "border border-accent shadow-glow" : "border border-base"}`}
              >
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border"
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
                <div className="font-display text-xl font-extrabold text-text mb-2">
                  {name}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className="font-display text-4xl font-extrabold"
                    style={{ color }}
                  >
                    {price}
                  </span>
                  <span className="text-[14px] text-muted">{period}</span>
                </div>
                <div className="flex flex-col gap-2.5 mb-7">
                  {fs.map((f) => (
                    <div
                      key={f}
                      className="flex gap-2.5 text-[14px] text-muted items-start"
                    >
                      <span className="text-brand shrink-0 mt-0.5">✓</span> {f}
                    </div>
                  ))}
                </div>
                <Link
                  href={href}
                  className={`block w-full text-center py-3 rounded-xl text-[14px] font-semibold no-underline transition-all
                  ${primary ? "gradient-brand text-white shadow-brand hover:opacity-90" : "bg-transparent text-muted border border-base hover:bg-input"}`}
                >
                  {cta}
                </Link>
              </div>
            ),
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-base px-16 py-10 flex justify-between items-center relative z-[1]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-sm text-white font-extrabold">
            ₩
          </div>
          <span className="font-display font-bold text-text">WealthWise</span>
        </div>
        <p className="text-[13px] text-dim" suppressHydrationWarning>
          © {new Date().getFullYear()} WealthWise. Built for financial clarity.
        </p>
        <div className="flex gap-6 text-[13px] text-dim">
          {["Privacy", "Terms", "Contact"].map((el) => (
            <span
              key={el}
              className="cursor-pointer hover:text-muted transition-colors"
            >
              {el}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
