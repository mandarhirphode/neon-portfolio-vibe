import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary-deep via-primary to-primary-glow shadow-[0_0_12px_hsl(var(--primary))]"
        style={{ width: `${p}%`, transition: "width 80ms linear" }}
      />
    </div>
  );
};

export default ScrollProgress;
