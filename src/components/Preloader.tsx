import { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/mh-logo.png";

/**
 * Multi-act preloader story:
 *  1. Data Engineering — pipeline from sources → warehouse
 *  2. Data Analysis    — charts forming, KPIs counting
 *  3. ML / DL          — neural net firing, loss converging
 *  4. LLM              — chat: "Creating a portfolio…" → tokens stream
 *  5. Thinking         — animated dots / shimmer
 *  6. Loading          — circular 0 → 100 progress
 *  7. Reveal           — fade out
 */

type Act = "engineering" | "analysis" | "ml" | "llm" | "thinking" | "loading";

const SCRIPT: { act: Act; ms: number }[] = [
  { act: "engineering", ms: 2400 },
  { act: "analysis", ms: 2200 },
  { act: "ml", ms: 2400 },
  { act: "llm", ms: 2600 },
  { act: "thinking", ms: 1400 },
  { act: "loading", ms: 2200 },
];

const Preloader = () => {
  const [actIdx, setActIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (actIdx >= SCRIPT.length) {
      setTimeout(() => setDone(true), 200);
      setTimeout(() => setHidden(true), 1000);
      return;
    }
    const t = setTimeout(() => setActIdx((i) => i + 1), SCRIPT[actIdx].ms);
    return () => clearTimeout(t);
  }, [actIdx]);

  const skip = () => {
    setActIdx(SCRIPT.length);
    setDone(true);
    setTimeout(() => setHidden(true), 600);
  };

  if (hidden) return null;

  const current = SCRIPT[actIdx]?.act ?? "loading";
  const stepLabels: Record<Act, string> = {
    engineering: "01 · Data Engineering",
    analysis: "02 · Data Analysis",
    ml: "03 · ML / Deep Learning",
    llm: "04 · LLM",
    thinking: "05 · Thinking",
    loading: "06 · Loading Portfolio",
  };

  return (
    <div
      onClick={skip}
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[180px]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative w-[min(960px,94vw)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <img src={logo} alt="MH" className="w-9 h-9 drop-shadow-[0_0_20px_hsl(var(--primary)/0.7)]" />
          <div className="font-display font-bold tracking-tight">
            Mandar <span className="font-serif-italic text-primary-glow">Hirphode</span>
          </div>
          <div className="ml-auto flex items-center gap-2 font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse" />
            booting
          </div>
        </div>

        {/* Stage chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {SCRIPT.map((s, i) => (
            <span
              key={s.act}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code uppercase tracking-wider border transition-all duration-300 ${
                i < actIdx
                  ? "border-primary/40 text-primary-glow/70 bg-primary/5"
                  : i === actIdx
                  ? "border-primary text-primary-glow bg-primary/15 shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                  : "border-white/10 text-foreground/40"
              }`}
            >
              {stepLabels[s.act]}
            </span>
          ))}
        </div>

        {/* Stage canvas */}
        <div className="relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_hsl(var(--primary)/0.18)] min-h-[360px]">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest">
              {stepLabels[current]}
            </span>
          </div>

          <div className="relative p-6 md:p-8 min-h-[300px] flex items-center justify-center">
            {current === "engineering" && <ActEngineering key="eng" />}
            {current === "analysis" && <ActAnalysis key="ana" />}
            {current === "ml" && <ActML key="ml" />}
            {current === "llm" && <ActLLM key="llm" />}
            {current === "thinking" && <ActThinking key="th" />}
            {current === "loading" && <ActLoading key="ld" />}
          </div>
        </div>

        <div className="mt-3 text-center font-mono-code text-[10px] text-foreground/35 uppercase tracking-widest">
          click anywhere to skip
        </div>
      </div>

      <style>{`
        @keyframes pl-flow {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes pl-draw { to { stroke-dashoffset: 0; } }
        @keyframes pl-bar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes pl-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pl-token {
          from { opacity: 0; transform: translateY(4px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes pl-dot { 0%,80%,100%{opacity:.2;transform:translateY(0)} 40%{opacity:1;transform:translateY(-4px)} }
        @keyframes pl-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

/* ───────────────── Act 1: Data Engineering ───────────────── */

const ActEngineering = () => {
  const sources = [
    { label: "API", icon: "{ }", y: 40 },
    { label: "DB", icon: "▦", y: 110 },
    { label: "CSV", icon: "≡", y: 180 },
  ];
  const W = 700, H = 220;
  const stages = [
    { x: 250, y: 110, label: "INGEST", icon: "↓" },
    { x: 400, y: 110, label: "TRANSFORM", icon: "⇆" },
    { x: 550, y: 110, label: "WAREHOUSE", icon: "▣" },
  ];

  const paths = sources.map(
    (s) => `M 70 ${s.y} C 160 ${s.y}, 160 110, 250 110 L 400 110 L 550 110`
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[260px] animate-fade-in">
      <defs>
        <filter id="eg-glow"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        {paths.map((d, i) => <path key={i} id={`eg-p-${i}`} d={d} fill="none" />)}
      </defs>

      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="hsl(var(--primary)/0.4)" strokeWidth="1" strokeDasharray="3 5" />
      ))}

      {sources.map((s, i) => (
        <g key={s.label}>
          <rect x={42} y={s.y - 18} width="56" height="36" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" />
          <text x={70} y={s.y + 4} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="13" fill="hsl(var(--primary-glow))">{s.icon}</text>
          <text x={70} y={s.y + 30} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="hsl(var(--foreground)/0.55)" style={{letterSpacing:1.5}}>{s.label}</text>
        </g>
      ))}

      {stages.map((st) => (
        <g key={st.label}>
          <circle cx={st.x} cy={st.y} r="32" fill="hsl(var(--primary)/0.08)">
            <animate attributeName="r" values="24;36;24" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={st.x} cy={st.y} r="20" fill="hsl(var(--card))" stroke="hsl(var(--primary-glow))" strokeWidth="1.4" />
          <text x={st.x} y={st.y + 5} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="14" fill="hsl(var(--primary-glow))">{st.icon}</text>
          <text x={st.x} y={st.y + 42} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="hsl(var(--foreground)/0.55)" style={{letterSpacing:1.5}}>{st.label}</text>
        </g>
      ))}

      {paths.map((d, i) =>
        Array.from({ length: 5 }).map((_, k) => (
          <circle
            key={`${i}-${k}`}
            r="2.4"
            fill="hsl(var(--primary-glow))"
            filter="url(#eg-glow)"
            style={{
              offsetPath: `path("${d}")`,
              animation: `pl-flow ${1600 + k * 60}ms ${i * 200 + k * 280}ms linear infinite`,
            }}
          />
        ))
      )}
    </svg>
  );
};

/* ───────────────── Act 2: Data Analysis ───────────────── */

const ActAnalysis = () => {
  const bars = [40, 65, 30, 80, 55, 90, 48];
  const linePts = "0,55 14,40 28,46 42,28 56,32 70,18 84,22 100,8";
  const kpis = [
    { label: "REVENUE", value: "₹4.2M" },
    { label: "GROWTH", value: "+18.4%" },
    { label: "USERS", value: "12,840" },
  ];

  return (
    <div className="w-full grid md:grid-cols-2 gap-6 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
            style={{ animation: `pl-fade-up 0.5s ${i * 0.15}s both` }}
          >
            <div className="font-mono-code text-[9px] text-foreground/40 uppercase tracking-widest mb-1">{k.label}</div>
            <div className="font-display text-xl font-bold gradient-text tabular-nums">{k.value}</div>
          </div>
        ))}
        <div className="col-span-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="font-mono-code text-[9px] text-foreground/40 uppercase tracking-widest mb-2">TREND</div>
          <svg viewBox="0 0 100 60" className="w-full h-20">
            <polyline points={linePts} fill="none" stroke="hsl(var(--primary-glow))" strokeWidth="1.6"
              strokeDasharray="200" strokeDashoffset="200"
              style={{ animation: "pl-draw 1.4s ease-out forwards" }} />
            <polyline points={`0,60 ${linePts} 100,60`} fill="hsl(var(--primary)/0.18)" stroke="none"
              style={{ opacity: 0, animation: "pl-fade-up 0.8s 1s forwards" }} />
          </svg>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="font-mono-code text-[9px] text-foreground/40 uppercase tracking-widest mb-3">WEEKLY BREAKDOWN</div>
        <div className="flex items-end justify-between gap-2 h-36">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t bg-gradient-to-t from-primary-deep to-primary-glow shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                style={{
                  height: `${b}%`,
                  transformOrigin: "bottom",
                  animation: `pl-bar 0.7s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1) both`,
                }}
              />
              <span className="font-mono-code text-[9px] text-foreground/40">{["M","T","W","T","F","S","S"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ───────────────── Act 3: ML / DL ───────────────── */

const ActML = () => {
  const LAYERS = [4, 6, 6, 3];
  const W = 560, H = 240;
  const PAD_X = 50, PAD_Y = 25;
  const nodes: { x: number; y: number; layer: number }[] = [];
  LAYERS.forEach((c, l) => {
    const colW = (W - PAD_X * 2) / (LAYERS.length - 1);
    const colH = H - PAD_Y * 2;
    const step = colH / Math.max(1, c - 1);
    for (let i = 0; i < c; i++) nodes.push({ x: PAD_X + l * colW, y: PAD_Y + i * step, layer: l });
  });
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < LAYERS.length - 1; l++) {
    const a = nodes.filter((n) => n.layer === l);
    const b = nodes.filter((n) => n.layer === l + 1);
    a.forEach((na) => b.forEach((nb) => edges.push({ x1: na.x, y1: na.y, x2: nb.x, y2: nb.y })));
  }

  const lossPts = Array.from({ length: 24 }, (_, i) => {
    const x = (i / 23) * 100;
    const y = 90 * Math.exp(-i / 6) + 6;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full grid md:grid-cols-[1fr_180px] gap-5 animate-fade-in">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[240px]">
        <defs>
          <filter id="ml-glow"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="hsl(var(--primary))" strokeOpacity="0.18" strokeWidth="0.9" />
        ))}
        {edges.filter((_, i) => i % 3 === 0).map((e, i) => (
          <circle key={i} r="2.2" fill="hsl(var(--primary-glow))" filter="url(#ml-glow)"
            style={{
              offsetPath: `path("M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}")`,
              animation: `pl-flow 1s ${(i % 8) * 0.08}s linear infinite`,
            }} />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="9" fill="hsl(var(--primary)/0.15)">
              <animate attributeName="r" values="6;11;6" dur="1.6s" begin={`${(n.layer * 0.15)}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={n.x} cy={n.y} r="5" fill="hsl(var(--card))" stroke="hsl(var(--primary-glow))" strokeWidth="1.3" />
          </g>
        ))}
      </svg>

      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="font-mono-code text-[9px] text-foreground/40 uppercase tracking-widest mb-1">loss</div>
          <svg viewBox="0 0 100 60" className="w-full h-14">
            <polyline points={lossPts} fill="none" stroke="hsl(var(--primary-glow))" strokeWidth="1.4"
              strokeDasharray="200" strokeDashoffset="200"
              style={{ animation: "pl-draw 1.6s ease-out forwards" }} />
          </svg>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 grid grid-cols-2 gap-2">
          <div>
            <div className="font-mono-code text-[9px] text-foreground/40 uppercase">acc</div>
            <div className="font-display text-base font-bold gradient-text">98.4%</div>
          </div>
          <div>
            <div className="font-mono-code text-[9px] text-foreground/40 uppercase">epoch</div>
            <div className="font-display text-base font-bold gradient-text">42</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────── Act 4: LLM ───────────────── */

const ActLLM = () => {
  const tokens = ["Creating", "a", "stunning", "portfolio", "for", "Mandar", "—", "data,", "ML,", "&", "design", "in", "motion."];
  return (
    <div className="w-full max-w-xl animate-fade-in">
      {/* user msg */}
      <div className="flex justify-end mb-3">
        <div className="rounded-2xl rounded-br-sm px-4 py-2 bg-primary/15 border border-primary/30 font-mono-code text-sm text-foreground/90 max-w-[75%]">
          ▸ build mandar's portfolio
        </div>
      </div>
      {/* assistant msg */}
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-deep to-primary-glow flex items-center justify-center font-mono-code text-xs font-bold shadow-[0_0_18px_hsl(var(--primary)/0.5)]">
          AI
        </div>
        <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-white/[0.04] border border-white/10 max-w-[80%] leading-relaxed">
          <div className="font-mono-code text-[10px] uppercase tracking-widest text-primary-glow mb-1.5">portfolio.llm · streaming</div>
          <div className="text-foreground/85 text-[15px] leading-relaxed">
            {tokens.map((t, i) => (
              <span key={i} className="inline-block mr-1" style={{ animation: `pl-token 0.35s ${i * 0.13}s both` }}>
                {t}
              </span>
            ))}
            <span className="inline-block w-1.5 h-4 align-middle bg-primary-glow ml-0.5 animate-blink" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────── Act 5: Thinking ───────────────── */

const ActThinking = () => (
  <div className="flex flex-col items-center gap-5 animate-fade-in">
    <div className="relative">
      <div className="w-24 h-24 rounded-full border border-primary/40 animate-spin-slow" style={{ animationDuration: "6s" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-glow shadow-[0_0_18px_hsl(var(--primary))]" />
      </div>
      <div className="absolute inset-2 rounded-full border border-primary/30" style={{ animation: "spin-slow 4s linear infinite reverse" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center font-mono-code text-[10px] text-primary-glow uppercase tracking-widest">
        thinking
      </div>
    </div>
    <div className="font-display text-2xl bg-gradient-to-r from-foreground/30 via-foreground to-foreground/30 bg-[length:200%_100%] bg-clip-text text-transparent"
      style={{ animation: "pl-shimmer 1.6s linear infinite" }}>
      Composing your experience
    </div>
    <div className="flex gap-1.5">
      {[0,1,2].map(i => (
        <span key={i} className="w-2 h-2 rounded-full bg-primary-glow"
          style={{ animation: `pl-dot 1.2s ${i * 0.18}s infinite` }} />
      ))}
    </div>
  </div>
);

/* ───────────────── Act 6: Loading 0 → 100 ───────────────── */

const ActLoading = () => {
  const [pct, setPct] = useState(0);
  const startRef = useRef<number | null>(null);
  const DUR = 2000;

  useEffect(() => {
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const e = t - startRef.current;
      const p = Math.min(100, (e / DUR) * 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const R = 78;
  const C = 2 * Math.PI * R;
  const offset = C - (pct / 100) * C;

  return (
    <div className="flex flex-col items-center gap-5 animate-fade-in">
      <div className="relative w-[200px] h-[200px]">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id="ld-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary-deep))" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r={R} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
          <circle
            cx="100" cy="100" r={R} fill="none"
            stroke="url(#ld-grad)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={offset}
            style={{ filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.7))", transition: "stroke-dashoffset 80ms linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-5xl font-bold gradient-text tabular-nums">{Math.floor(pct)}</div>
          <div className="font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest">percent</div>
        </div>
      </div>
      <div className="font-mono-code text-xs text-foreground/60">› Mounting portfolio…</div>
    </div>
  );
};

export default Preloader;
