import Reveal from "./Reveal";

export const SectionHeader = ({
  kicker,
  title,
  italic,
}: {
  kicker: string;
  title: string;
  italic?: string;
}) => (
  <Reveal className="mb-14">
    <div className="flex items-center gap-3 font-mono-code text-primary-glow text-xs tracking-[0.25em] uppercase mb-4">
      <span className="w-8 h-px bg-primary-glow" />
      {kicker}
    </div>
    <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
      {title}{" "}
      {italic && <span className="font-serif-italic gradient-text">{italic}</span>}
    </h2>
  </Reveal>
);
