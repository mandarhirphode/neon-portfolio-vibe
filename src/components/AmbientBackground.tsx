/**
 * Full-page ambient background: pure black canvas with two animated
 * purple gradient blobs, a faint grid, and a subtle noise overlay.
 * Lightweight (CSS only, no canvas).
 */
const AmbientBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
    <div className="absolute inset-0 grid-bg opacity-50" />
    <div
      className="absolute -top-32 -left-32 w-[55vw] h-[55vw] rounded-full blur-3xl opacity-40 animate-blob-1"
      style={{ background: "radial-gradient(circle, hsl(271 91% 65% / 0.55), transparent 60%)" }}
    />
    <div
      className="absolute -bottom-32 -right-32 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-35 animate-blob-2"
      style={{ background: "radial-gradient(circle, hsl(280 100% 75% / 0.5), transparent 60%)" }}
    />
    <div
      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-25 animate-blob-1"
      style={{ background: "radial-gradient(circle, hsl(263 70% 50% / 0.5), transparent 60%)", animationDelay: "-8s" }}
    />
    {/* vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,black_100%)]" />
  </div>
);

export default AmbientBackground;
