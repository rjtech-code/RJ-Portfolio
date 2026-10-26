// Decorative hero illustrations built with CSS (stand-ins for the 3D renders in the
// reference design). All are aria-hidden: they carry no content.

const Glow = () => (
  <>
    <div className="absolute inset-x-10 bottom-0 h-24 bg-[#F97316]/25 blur-3xl rounded-full" />
    <div className="absolute -top-6 right-6 w-40 h-40 bg-sky-500/20 blur-3xl rounded-full" />
  </>
);

const Screen = ({ children, className = "" }) => (
  <div className={`relative rounded-xl border border-sky-300/30 bg-gradient-to-br from-[#0E2547] to-[#071225] shadow-[0_0_40px_rgba(56,189,248,0.25)] overflow-hidden ${className}`}>
    <div className="flex gap-1 px-3 py-2 border-b border-white/5">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const Lines = ({ rows = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: `${90 - i * 18}%` }} />
    ))}
  </div>
);

const WebsiteScreen = () => (
  <>
    <div className="h-3 w-1/2 rounded bg-gradient-to-r from-[#F97316]/70 to-transparent mb-3" />
    <Lines rows={2} />
    <div className="grid grid-cols-3 gap-2 mt-4">
      {[0, 1, 2].map((i) => <div key={i} className="h-12 rounded-md bg-white/5 border border-white/5" />)}
    </div>
  </>
);

const DashboardScreen = () => (
  <div className="flex gap-3">
    <div className="w-8 space-y-2">{[0, 1, 2, 3].map((i) => <div key={i} className={`h-2 rounded ${i === 0 ? "bg-[#F97316]/70" : "bg-white/10"}`} />)}</div>
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-2 mb-3">{[0, 1, 2].map((i) => <div key={i} className="h-8 rounded bg-white/5 border border-white/5" />)}</div>
      <div className="flex items-end gap-1.5 h-16">
        {[40, 65, 50, 80, 60, 90, 70].map((h, i) => <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-sky-500/30 to-sky-300/60" style={{ height: `${h}%` }} />)}
      </div>
    </div>
  </div>
);

const StoreScreen = () => (
  <div className="grid grid-cols-3 gap-2">
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="space-y-1">
        <div className={`aspect-square rounded-md ${i % 2 ? "bg-[#F97316]/30" : "bg-sky-400/20"}`} />
        <div className="h-1 rounded bg-white/15" />
      </div>
    ))}
  </div>
);

export function HeroIllustration({ variant = "laptop" }) {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-[4/3]" aria-hidden="true">
      <Glow />
      {variant === "atom" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-56 h-56">
            {[0, 60, 120].map((deg) => (
              <div key={deg} className="absolute inset-0 rounded-[50%] border-2 border-sky-300/70 shadow-[0_0_25px_rgba(56,189,248,0.5)]" style={{ transform: `rotate(${deg}deg) scaleY(0.38)` }} />
            ))}
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-sky-300 shadow-[0_0_35px_rgba(56,189,248,0.9)]" />
          </div>
        </div>
      )}
      {variant === "phones" && (
        <div className="absolute inset-0 flex items-end justify-center gap-3 pb-6">
          {[["h-52", "from-sky-400/40"], ["h-60", "from-white/80"], ["h-52", "from-[#F97316]/50"]].map(([h, from], i) => (
            <div key={i} className={`w-28 ${h} rounded-2xl border border-white/20 bg-gradient-to-b ${from} to-[#0B1A33] p-2 shadow-[0_0_30px_rgba(56,189,248,0.25)]`}>
              <div className="h-full rounded-xl bg-[#0B1A33]/70 p-2 space-y-2">
                <div className="h-14 rounded-lg bg-white/10" />
                <Lines rows={3} />
              </div>
            </div>
          ))}
        </div>
      )}
      {(variant === "laptop" || variant === "monitor" || variant === "dashboard" || variant === "store") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Screen className="w-[88%]">
            {variant === "dashboard" ? <DashboardScreen /> : variant === "store" ? <StoreScreen /> : <WebsiteScreen />}
          </Screen>
          {variant === "monitor" ? (
            <>
              <div className="w-6 h-8 bg-gradient-to-b from-slate-500/60 to-slate-700/40" />
              <div className="w-32 h-2 rounded-full bg-slate-500/50" />
            </>
          ) : (
            <div className="w-[96%] h-3 rounded-b-xl bg-gradient-to-b from-slate-400/50 to-slate-700/40 border-t border-[#F97316]/60 shadow-[0_0_25px_rgba(249,115,22,0.5)]" />
          )}
        </div>
      )}
    </div>
  );
}
