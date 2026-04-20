export function MarketingBackground() {
  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-1/2 z-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[520px] sm:w-[520px] lg:h-[620px] lg:w-[620px]"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed right-0 bottom-1/4 z-0 h-[320px] w-[320px] translate-x-1/3 rounded-full sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
