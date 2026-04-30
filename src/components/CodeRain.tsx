import { useEffect, useRef } from "react";

/**
 * Full-page falling-code background animation.
 * Uses Latin letters, digits, and code symbols (no CJK characters).
 * Each column is randomly tinted green / blue / yellow to match the theme.
 */
const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]()/\\=+-*!?#$%&|;:";
    const fontSize = 16;
    let drops: number[] = [];
    let colors: string[] = [];

    const palette = ["#00ff7f", "#3da9ff", "#ffd60a"]; // green, blue, yellow

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(0).map(() => Math.random() * -50);
      colors = Array(columns)
        .fill(0)
        .map(() => palette[Math.floor(Math.random() * palette.length)]);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      if (t - last > 55) {
        last = t;
        // fade trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;

        for (let i = 0; i < drops.length; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.shadowColor = colors[i];
          ctx.shadowBlur = 10;
          ctx.fillStyle = colors[i];
          ctx.fillText(ch, x, y);

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
            colors[i] = palette[Math.floor(Math.random() * palette.length)];
          }
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-30 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default CodeRain;
