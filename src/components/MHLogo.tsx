import { cn } from "@/lib/utils";

type MHLogoProps = {
  className?: string;
};

const MHLogo = ({ className }: MHLogoProps) => (
  <svg
    viewBox="0 0 64 64"
    role="img"
    aria-label="Mandar Hirphode logo"
    className={cn("h-8 w-8 text-primary-glow", className)}
  >
    <path
      d="M10 46.5V15.5c0-2.6 3-4.1 5.1-2.5L32 26.1 48.9 13c2.1-1.6 5.1-.1 5.1 2.5v31c0 2.6-3 4.1-5.1 2.5L42 43.6V30.8l-7.7 6a3.7 3.7 0 0 1-4.6 0l-7.7-6v12.8L15.1 49c-2.1 1.6-5.1.1-5.1-2.5Z"
      fill="currentColor"
    />
    <path
      d="M24.2 50.5V35.4l7.8 6.1 7.8-6.1v15.1c0 2-1.6 3.5-3.5 3.5h-2.1V46l-2.2 1.7L29.8 46v8h-2.1c-1.9 0-3.5-1.5-3.5-3.5Z"
      fill="currentColor"
    />
    <path
      d="M17 22.9 31.2 34a1.3 1.3 0 0 0 1.6 0L47 22.9v17.2l-5-3.9v-4.8l-9.2 7.2a1.3 1.3 0 0 1-1.6 0L22 31.4v4.8l-5 3.9V22.9Z"
      fill="hsl(var(--background))"
      opacity="0.42"
    />
  </svg>
);

export default MHLogo;
