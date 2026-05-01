import { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/mh-logo.png";

/**
 * Neural-network training preloader.
 * A 4-layer net animates: data ingress → forward pass → backprop → predictions.
 * Side panels show: live metrics, dataset rows streaming, loss curve drawing.
 * All theme-token driven. Pure SVG + CSS, no extra deps.
 */

const STAGES = [
  "Loading dataset",
  "Initializing weights",
  "Forward pass",
  "Computing loss",
  "Backpropagation",
  "Optimizing model",
  "Generating predictions",
];

const TOTAL_MS = 4200;

// Network shape
const LAYERS = [4, 6, 6, 3];
const W = 520;
const H = 320;
const PAD_X = 60;
const PAD_Y = 30;

type Node = { x: number; y: number; layer: number; idx: number };

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pulseToken, setPulseToken] = useState(0);
  const startRef = useRef<number | null>(null);

  // Build node positions
  const nodes = useMemo<Node[]>(() => {
    const arr: Node[] = [];
    const colW = (W - PAD_X * 2) / (LAYERS.length - 1);
    LAYERS.forEach((count, layer) => {
      const colH = H - PAD_Y * 2;
      const step = colH / Math.max(1, count - 1);
      for (let i = 0; i < count; i++) {
        arr.push({
          x: PAD_X + layer * colW,
          y: count === 1 ? H / 2 : PAD_Y + i * step,
          layer,
          idx: i,
        });
      }
    });
    return arr;
  }, []);

  // Build edges
  const edges = useMemo(() => {
    const arr: { x1: number; y1: number; x2: number; y2: number; key: string; weight: number }[] = [];
    for (let l = 0; l < LAYERS.length - 1; l++) {
      const a = nodes.filter((n) => n.layer === l);
      const b = nodes.filter((n) => n.layer === l + 1);
      a.forEach((na) =>
        b.forEach((nb) => {
          arr.push({
            x1: na.x,
            y1: na.y,
            x2: nb.x,
            y2: nb.y,
            key: `${na.layer}-${na.idx}-${nb.idx}`,
            weight: Math.random(),
          });
        })
      );
    }
    return arr;
  }, [nodes]);

  // Drive progress
  useEffect(() => {
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(100, (elapsed / TOTAL_MS) * 100);
      setProgress(p);
      setStage(Math.min(STAGES.length - 1, Math.floor((p / 100) * STAGES.length)));
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 350);
        setTimeout(() => setHidden(true), 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Forward/back pulse trigger every ~700ms
  useEffect(() => {
    const id = setInterval(() => setPulseToken((x) => x + 1), 700);
    return () => clearInterval(id);
  }, []);

  const skip = () => {
    setProgress(100);
    setStage(STAGES.length - 1);
    setDone(true);
    setTimeout(() => setHidden(true), 600);
  };

  if (hidden) return null;

  // Direction alternates: forward (even pulses), backward (odd)
  const isBackward = pulseToken % 2 === 1;

  // Loss curve points (drawn over time)
  const lossPoints = Array.from({ length: 24 }, (_, i) => {
    const x = (i / 23) * 100;
    const y = 90 * Math.exp(-i / 6) + 6 + Math.sin(i * 1.2) * 2;
    return `${x},${y}`;
  }).join(" ");

  // Streaming dataset rows
  const rows = [
    { a: "0.42", b: "1.07", c: "0.13", y: "1" },
    { a: "0.81", b: "0.22", c: "0.94", y: "0" },
    { a: "0.05", b: "0.66", c: "0.31", y: "1" },
    { a: "0.73", b: "0.49", c: "0.58", y: "0" },
    { a: "0.18", b: "0.92", c: "0.27", y: "1" },
  ];

  return (
    <div
      onClick={skip}
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[180px]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative w-[min(1100px,94vw)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <img src={logo} alt="MH" className="w-9 h-9 drop-shadow-[0_0_20px_hsl(var(--primary)/0.7)]" />
          <div className="font-display font-bold tracking-tight">
            Mandar <span className="font-serif-italic text-primary-glow">Hirphode</span>
          </div>
          <div className="ml-auto flex items-center gap-2 font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse" />
            training neural net
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-4">
          {/* Network panel */}
          <div className="relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_hsl(var(--primary)/0.18)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full bg-primary-glow shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="font-mono-code text-[10px] text-foreground/60 uppercase tracking-widest">
                model.train() — epoch {Math.min(50, Math.floor(progress / 2)) + 1}/50
              </span>
              <span className="ml-auto font-mono-code text-[10px] text-foreground/40">
                {isBackward ? "← backward" : "forward →"}
              </span>
            </div>

            <div className="relative p-2">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[260px] md:h-[320px]">
                <defs>
                  <linearGradient id="edgeFwd" x1="0" x2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    <stop offset="50%" stopColor="hsl(var(--primary-glow))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="nodeRing">
                    <stop offset="60%" stopColor="hsl(var(--primary-glow))" stopOpacity="0" />
                    <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.6" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Layer labels */}
                {LAYERS.map((_, i) => (
                  <text
                    key={i}
                    x={PAD_X + (i * (W - PAD_X * 2)) / (LAYERS.length - 1)}
                    y={H - 4}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="9"
                    fill="hsl(var(--foreground) / 0.4)"
                    style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
                  >
                    {i === 0 ? "input" : i === LAYERS.length - 1 ? "output" : `hidden ${i}`}
                  </text>
                ))}

                {/* Edges */}
                {edges.map((e) => (
                  <line
                    key={e.key}
                    x1={e.x1}
                    y1={e.y1}
                    x2={e.x2}
                    y2={e.y2}
                    stroke="hsl(var(--primary))"
                    strokeOpacity={0.08 + e.weight * 0.18}
                    strokeWidth={0.8 + e.weight * 0.6}
                  />
                ))}

                {/* Animated signal pulses on a subset of edges */}
                {edges
                  .filter((_, i) => i % 3 === 0)
                  .map((e, i) => {
                    const path = isBackward
                      ? `M ${e.x2} ${e.y2} L ${e.x1} ${e.y1}`
                      : `M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`;
                    return (
                      <g key={`pulse-${i}-${pulseToken}`}>
                        <circle
                          r="2.4"
                          fill={
                            isBackward
                              ? "hsl(var(--destructive) / 0.95)"
                              : "hsl(var(--primary-glow))"
                          }
                          filter="url(#glow)"
                        >
                          <animateMotion
                            dur="0.7s"
                            begin={`${(i % 6) * 0.06}s`}
                            fill="freeze"
                            path={path}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;1;1;0"
                            dur="0.7s"
                            begin={`${(i % 6) * 0.06}s`}
                            fill="freeze"
                          />
                        </circle>
                      </g>
                    );
                  })}

                {/* Nodes */}
                {nodes.map((n, i) => {
                  const activated = (n.layer + Math.floor(pulseToken)) % 2 === 0;
                  return (
                    <g key={i}>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r="11"
                        fill="url(#nodeRing)"
                        opacity={activated ? 0.9 : 0.4}
                      />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r="6"
                        fill="hsl(var(--card))"
                        stroke={
                          activated ? "hsl(var(--primary-glow))" : "hsl(var(--primary) / 0.4)"
                        }
                        strokeWidth="1.4"
                      />
                      {activated && (
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r="3"
                          fill="hsl(var(--primary-glow))"
                          filter="url(#glow)"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Stage label + progress */}
            <div className="px-5 pb-5 pt-1">
              <div className="flex items-end justify-between mb-2 font-mono-code text-xs">
                <span className="text-primary-glow animate-fade-in" key={stage}>
                  › {STAGES[stage]}…
                </span>
                <span className="text-foreground/60 tabular-nums">{Math.floor(progress)}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-deep via-primary to-primary-glow shadow-[0_0_12px_hsl(var(--primary))] transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Side panel: metrics + dataset + loss */}
          <div className="space-y-4">
            {/* Metrics */}
            <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-4">
              <div className="font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest mb-3">
                metrics
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Metric label="loss" value={(2.4 * Math.exp(-progress / 35) + 0.04).toFixed(3)} />
                <Metric label="acc" value={`${Math.min(99.2, 12 + progress * 0.88).toFixed(1)}%`} />
                <Metric label="lr" value="3e-4" />
                <Metric label="batch" value="128" />
              </div>
            </div>

            {/* Loss curve */}
            <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest">
                  training loss
                </div>
                <div className="font-mono-code text-[10px] text-primary-glow">↓ converging</div>
              </div>
              <svg viewBox="0 0 100 60" className="w-full h-16">
                <polyline
                  points={lossPoints}
                  fill="none"
                  stroke="hsl(var(--primary-glow))"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  style={{ animation: "pl-draw 3.5s ease-out forwards" }}
                />
                <polyline
                  points={`0,60 ${lossPoints} 100,60`}
                  fill="hsl(var(--primary) / 0.15)"
                  stroke="none"
                  style={{ animation: "pl-fade-in 1.2s 1.2s ease-out forwards", opacity: 0 }}
                />
              </svg>
            </div>

            {/* Dataset stream */}
            <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-4 overflow-hidden">
              <div className="font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest mb-2">
                dataset.csv
              </div>
              <div className="font-mono-code text-[10px] text-foreground/40 grid grid-cols-4 gap-2 pb-1.5 border-b border-white/5">
                <span>x₁</span>
                <span>x₂</span>
                <span>x₃</span>
                <span className="text-primary-glow">y</span>
              </div>
              <div className="space-y-1 pt-1.5">
                {rows.map((r, i) => (
                  <div
                    key={i}
                    className="font-mono-code text-[11px] grid grid-cols-4 gap-2 text-foreground/70"
                    style={{ animation: `pl-row-in 0.5s ${i * 0.18}s ease-out both` }}
                  >
                    <span>{r.a}</span>
                    <span>{r.b}</span>
                    <span>{r.c}</span>
                    <span className="text-primary-glow">{r.y}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-center font-mono-code text-[10px] text-foreground/35 uppercase tracking-widest">
          click anywhere to skip
        </div>
      </div>

      <style>{`
        @keyframes pl-draw { to { stroke-dashoffset: 0; } }
        @keyframes pl-fade-in { to { opacity: 1; } }
        @keyframes pl-row-in {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="font-mono-code text-[9px] text-foreground/40 uppercase tracking-widest mb-0.5">
      {label}
    </div>
    <div className="font-display text-xl font-bold gradient-text tabular-nums">{value}</div>
  </div>
);

export default Preloader;
