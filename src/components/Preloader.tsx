import { useEffect, useState } from "react";
import logo from "@/assets/mh-logo.png";

const COMMAND = "irm https://mandar.dev/portfolio.ps1 | iex";

const STEPS = [
  { label: "Resolving https://mandar.dev/portfolio.ps1", delay: 500 },
  { label: "Verifying signature ......................... ok", delay: 650 },
  { label: "Downloading manifest [████████████████] 100%", delay: 800 },
  { label: "Loading data pipelines ........................ ok", delay: 600 },
  { label: "Booting BI dashboards ......................... ok", delay: 550 },
  { label: "Mounting portfolio  ✔", delay: 500 },
];

const Preloader = () => {
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Type the command char by char
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(id);
        setTimeout(() => setStep(0), 350);
      }
    }, 35);
    return () => clearInterval(id);
  }, []);

  // Walk through steps
  useEffect(() => {
    if (step < 0) return;
    if (step >= STEPS.length) {
      setTimeout(() => setDone(true), 350);
      setTimeout(() => setHidden(true), 1100);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEPS[step].delay);
    return () => clearTimeout(t);
  }, [step]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[140px]" />
      </div>

      <div className="relative w-[min(680px,92vw)]">
        {/* Logo + title */}
        <div className="flex items-center gap-3 mb-5">
          <img src={logo} alt="MH" className="w-9 h-9 drop-shadow-[0_0_20px_hsl(var(--primary)/0.7)]" />
          <div className="font-display font-bold tracking-tight">
            Mandar <span className="font-serif-italic text-primary-glow">Hirphode</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 font-mono-code text-[10px] text-foreground/50 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse" />
            booting
          </div>
        </div>

        {/* Terminal */}
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_hsl(var(--primary)/0.25)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono-code text-xs text-foreground/50">
              powershell — mandar@portfolio
            </span>
          </div>

          {/* Body */}
          <div className="p-5 font-mono-code text-[13px] leading-relaxed min-h-[260px]">
            <div className="flex">
              <span className="text-primary-glow">PS&nbsp;C:\Users\mandar&gt;&nbsp;</span>
              <span className="text-foreground">{typed}</span>
              {typed.length < COMMAND.length && (
                <span className="ml-0.5 inline-block w-2 h-4 bg-primary-glow animate-blink" />
              )}
            </div>

            <div className="mt-3 space-y-1.5 text-foreground/70">
              {STEPS.slice(0, Math.max(0, step)).map((s, i) => (
                <div key={i} className="flex gap-2 animate-fade-in">
                  <span className="text-primary">›</span>
                  <span>{s.label}</span>
                </div>
              ))}
              {step >= 0 && step < STEPS.length && (
                <div className="flex gap-2 animate-fade-in">
                  <span className="text-primary-glow animate-pulse">›</span>
                  <span className="text-foreground">{STEPS[step].label}</span>
                  <span className="ml-1 inline-block w-1.5 h-4 bg-primary-glow animate-blink" />
                </div>
              )}
              {step >= STEPS.length && (
                <div className="pt-2 text-primary-glow">✔ Welcome.</div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-primary-deep via-primary to-primary-glow shadow-[0_0_12px_hsl(var(--primary))] transition-all duration-500"
              style={{
                width: `${Math.min(100, ((Math.max(0, step) + (typed.length === COMMAND.length ? 1 : 0)) / (STEPS.length + 1)) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
