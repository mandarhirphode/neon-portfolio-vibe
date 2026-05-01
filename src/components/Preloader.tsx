import { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/mh-logo.png";

/**
 * Advanced data-pipeline preloader.
 * Simulates: SOURCES → CLEANING → TRANSFORM → STORAGE → ANALYSIS → OUTPUT
 * Pure SVG + CSS, no extra deps. Uses theme tokens only.
 */

const STAGES = [
  { key: "collect", label: "Collecting data…", pct: 12 },
  { key: "clean", label: "Cleaning data…", pct: 32 },
  { key: "transform", label: "Transforming streams…", pct: 52 },
  { key: "store", label: "Storing to warehouse…", pct: 70 },
  { key: "analyze", label: "Training model…", pct: 86 },
  { key: "insights", label: "Generating insights…", pct: 100 },
];

const TOTAL_MS = 4000;

type Particle = {
  id: number;
  src: number; // 0,1,2
  startDelay: number;
  duration: number;
  invalid: boolean;
};

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const startRef = useRef<number | null>(null);

  // Generate particle stream once
  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      arr.push({
        id: i,
        src: i % 3,
        startDelay: (i * 110) % 2600,
        duration: 1800 + ((i * 53) % 700),
        invalid: i % 5 === 0,
      });
    }
    return arr;
  }, []);

  // Drive progress
  useEffect(() => {
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(100, (elapsed / TOTAL_MS) * 100);
      setProgress(p);
      // pick stage by pct threshold
      let idx = 0;
      for (let i = 0; i < STAGES.length; i++) if (p >= STAGES[i].pct - 12) idx = i;
      setStageIdx(idx);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 250);
        setTimeout(() => setHidden(true), 950);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Skip on click
  const skip = () => {
    setProgress(100);
    setStageIdx(STAGES.length - 1);
    setDone(true);
    setTimeout(() => setHidden(true), 600);
  };

  if (hidden) return null;

  const current = STAGES[stageIdx];

  return (
    <div
      onClick={skip}
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/15 blur-[160px]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="relative w-[min(1000px,94vw)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={logo}
            alt="MH"
            className="w-9 h-9 drop-shadow-[0_0_20px_hsl(var(--primary)/0.7)]"
          />
          <div className="font-display font-bold tracking-tight">
            Mandar <span className="font-serif-italic text-primary-glow">Hirphode</span>
          </div>
          <div className="ml-auto flex items-center gap-2 font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse" />
            initializing pipeline
          </div>
        </div>

        {/* Pipeline canvas */}
        <div className="relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_hsl(var(--primary)/0.2)]">
          <Pipeline particles={particles} stageIdx={stageIdx} />

          {/* Stage label + progress */}
          <div className="px-6 pb-5 pt-2">
            <div className="flex items-end justify-between mb-2 font-mono-code text-xs">
              <span className="text-primary-glow animate-fade-in" key={current.key}>
                › {current.label}
              </span>
              <span className="text-foreground/60 tabular-nums">
                {Math.floor(progress)}%
              </span>
            </div>
            <div className="h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-deep via-primary to-primary-glow shadow-[0_0_12px_hsl(var(--primary))] transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {STAGES.map((s, i) => (
                <span
                  key={s.key}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono-code uppercase tracking-wider border transition-colors duration-300 ${
                    i < stageIdx
                      ? "border-primary/40 text-primary-glow/80 bg-primary/5"
                      : i === stageIdx
                      ? "border-primary text-primary-glow bg-primary/15 shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                      : "border-white/10 text-foreground/40"
                  }`}
                >
                  {s.key}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 text-center font-mono-code text-[10px] text-foreground/35 uppercase tracking-widest">
          click anywhere to skip
        </div>
      </div>

      <style>{`
        @keyframes flow-1 {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes flow-fade {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          45% { opacity: 1; }
          55% { opacity: 0; }
          100% { offset-distance: 55%; opacity: 0; }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes bar-grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes count-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes node-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

/* ───────────────────────── Pipeline SVG ───────────────────────── */

const Pipeline = ({
  particles,
  stageIdx,
}: {
  particles: Particle[];
  stageIdx: number;
}) => {
  // Coordinates (viewBox 1000x340)
  const sources = [
    { x: 60, y: 70, label: "API", icon: "{ }" },
    { x: 60, y: 170, label: "DB", icon: "▦" },
    { x: 60, y: 270, label: "CSV", icon: "≡" },
  ];
  const cleanX = 280;
  const transformX = 470;
  const storeX = 640;
  const analyzeX = 800;
  const outputX = 940;
  const midY = 170;

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1000 340"
        className="w-full h-[280px] md:h-[340px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pipeStroke" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--primary-deep))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Motion paths: source → clean → transform → store → analyze → output */}
          {sources.map((s, i) => (
            <path
              key={`p${i}`}
              id={`path-${i}`}
              d={`M ${s.x + 28} ${s.y}
                  C ${cleanX - 60} ${s.y}, ${cleanX - 60} ${midY}, ${cleanX} ${midY}
                  L ${transformX} ${midY}
                  L ${storeX} ${midY}
                  L ${analyzeX} ${midY}
                  L ${outputX} ${midY}`}
              fill="none"
            />
          ))}
        </defs>

        {/* Connector lines (drawn) */}
        {sources.map((s, i) => (
          <use
            key={`line-${i}`}
            href={`#path-${i}`}
            stroke="url(#pipeStroke)"
            strokeWidth="1.2"
            strokeDasharray="3 5"
            opacity="0.5"
          />
        ))}

        {/* SOURCES */}
        {sources.map((s, i) => (
          <g key={s.label}>
            <rect
              x={s.x - 26}
              y={s.y - 22}
              width="56"
              height="44"
              rx="10"
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="1"
            />
            <text
              x={s.x}
              y={s.y + 2}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="14"
              fill="hsl(var(--primary-glow))"
            >
              {s.icon}
            </text>
            <text
              x={s.x}
              y={s.y + 36}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fill="hsl(var(--foreground) / 0.5)"
              style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* CLEANING node */}
        <StageNode
          x={cleanX}
          y={midY}
          label="CLEAN"
          active={stageIdx >= 1}
          icon="✦"
        />

        {/* TRANSFORM node */}
        <StageNode
          x={transformX}
          y={midY}
          label="TRANSFORM"
          active={stageIdx >= 2}
          icon="⇆"
        />

        {/* STORAGE - cylinder */}
        <g transform={`translate(${storeX} ${midY})`}>
          <ellipse
            cx="0"
            cy="-22"
            rx="28"
            ry="8"
            fill="hsl(var(--card))"
            stroke={
              stageIdx >= 3 ? "hsl(var(--primary-glow))" : "hsl(var(--primary) / 0.4)"
            }
            strokeWidth="1.2"
          />
          <rect
            x="-28"
            y="-22"
            width="56"
            height="44"
            fill="hsl(var(--card))"
            stroke={
              stageIdx >= 3 ? "hsl(var(--primary-glow))" : "hsl(var(--primary) / 0.4)"
            }
            strokeWidth="1.2"
          />
          <ellipse
            cx="0"
            cy="22"
            rx="28"
            ry="8"
            fill="hsl(var(--card))"
            stroke={
              stageIdx >= 3 ? "hsl(var(--primary-glow))" : "hsl(var(--primary) / 0.4)"
            }
            strokeWidth="1.2"
          />
          {stageIdx >= 3 && (
            <circle cx="0" cy="0" r="40" fill="url(#nodeGlow)">
              <animate
                attributeName="r"
                values="30;46;30"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          )}
          <text
            x="0"
            y="44"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="hsl(var(--foreground) / 0.55)"
            style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
          >
            WAREHOUSE
          </text>
        </g>

        {/* ANALYSIS - mini chart + nodes */}
        <g transform={`translate(${analyzeX} ${midY})`}>
          <rect
            x="-32"
            y="-26"
            width="64"
            height="52"
            rx="8"
            fill="hsl(var(--card))"
            stroke={
              stageIdx >= 4 ? "hsl(var(--primary-glow))" : "hsl(var(--primary) / 0.4)"
            }
            strokeWidth="1.2"
          />
          {stageIdx >= 4 && (
            <>
              {/* growing bars */}
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={i}
                  x={-24 + i * 12}
                  y={4}
                  width="6"
                  height={6 + i * 5}
                  fill="hsl(var(--primary-glow))"
                  style={{
                    transformOrigin: `${-24 + i * 12 + 3}px ${4 + 6 + i * 5}px`,
                    animation: `bar-grow 0.5s ${i * 0.12}s ease-out both`,
                  }}
                />
              ))}
              {/* line graph */}
              <polyline
                points="-26,-4 -14,-12 -2,-6 10,-18 22,-10"
                fill="none"
                stroke="hsl(var(--primary-glow))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="80"
                strokeDashoffset="80"
                style={{ animation: "draw-line 0.9s 0.3s ease-out forwards" }}
                filter="url(#soft-glow)"
              />
            </>
          )}
          <text
            x="0"
            y="44"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="hsl(var(--foreground) / 0.55)"
            style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
          >
            ANALYZE
          </text>
        </g>

        {/* OUTPUT - dashboard */}
        <g transform={`translate(${outputX} ${midY})`}>
          <rect
            x="-30"
            y="-30"
            width="56"
            height="60"
            rx="8"
            fill="hsl(var(--card))"
            stroke={
              stageIdx >= 5 ? "hsl(var(--primary-glow))" : "hsl(var(--primary) / 0.4)"
            }
            strokeWidth="1.2"
          />
          {stageIdx >= 5 && (
            <g style={{ animation: "node-pop 0.6s ease-out both" }}>
              <rect x="-24" y="-22" width="22" height="10" rx="2" fill="hsl(var(--primary) / 0.5)" />
              <rect x="0" y="-22" width="22" height="10" rx="2" fill="hsl(var(--primary-glow) / 0.6)" />
              <rect x="-24" y="-6" width="46" height="3" rx="1" fill="hsl(var(--primary-glow))" />
              <rect x="-24" y="2" width="34" height="3" rx="1" fill="hsl(var(--primary) / 0.7)" />
              <rect x="-24" y="10" width="40" height="3" rx="1" fill="hsl(var(--primary-glow) / 0.7)" />
              <rect x="-24" y="18" width="28" height="3" rx="1" fill="hsl(var(--primary) / 0.6)" />
            </g>
          )}
          <text
            x="-2"
            y="44"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="hsl(var(--foreground) / 0.55)"
            style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
          >
            INSIGHTS
          </text>
        </g>

        {/* PARTICLES — animate along motion paths */}
        {particles.map((p) => (
          <circle
            key={p.id}
            r={p.invalid ? 1.6 : 2.2}
            fill={
              p.invalid
                ? "hsl(var(--destructive) / 0.9)"
                : "hsl(var(--primary-glow))"
            }
            filter="url(#soft-glow)"
            style={{
              offsetPath: `path("${getPathD(p.src, sources, cleanX, transformX, storeX, analyzeX, outputX, midY)}")`,
              animation: `${p.invalid ? "flow-fade" : "flow-1"} ${p.duration}ms ${p.startDelay}ms linear infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const StageNode = ({
  x,
  y,
  label,
  active,
  icon,
}: {
  x: number;
  y: number;
  label: string;
  active: boolean;
  icon: string;
}) => (
  <g transform={`translate(${x} ${y})`}>
    {active && (
      <circle r="32" fill="url(#nodeGlow)">
        <animate attributeName="r" values="22;36;22" dur="1.8s" repeatCount="indefinite" />
      </circle>
    )}
    <circle
      r="22"
      fill="hsl(var(--card))"
      stroke={active ? "hsl(var(--primary-glow))" : "hsl(var(--primary) / 0.4)"}
      strokeWidth="1.2"
    />
    <text
      y="5"
      textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontSize="14"
      fill={active ? "hsl(var(--primary-glow))" : "hsl(var(--foreground) / 0.6)"}
    >
      {icon}
    </text>
    <text
      y="40"
      textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontSize="9"
      fill="hsl(var(--foreground) / 0.55)"
      style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
    >
      {label}
    </text>
  </g>
);

function getPathD(
  i: number,
  sources: { x: number; y: number }[],
  cleanX: number,
  transformX: number,
  storeX: number,
  analyzeX: number,
  outputX: number,
  midY: number
) {
  const s = sources[i];
  return `M ${s.x + 28} ${s.y} C ${cleanX - 60} ${s.y}, ${cleanX - 60} ${midY}, ${cleanX} ${midY} L ${transformX} ${midY} L ${storeX} ${midY} L ${analyzeX} ${midY} L ${outputX} ${midY}`;
}

export default Preloader;
