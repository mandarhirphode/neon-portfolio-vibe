import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import MHLogo from "./MHLogo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-3 inset-x-3 md:inset-x-6 z-50 transition-all duration-500 rounded-2xl ${
        scrolled ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-5 md:px-7 py-3">
        <a href="#home" className="flex items-center gap-2.5 group" data-cursor="hover">
          <MHLogo className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[20deg]" />
          <span className="font-display font-bold tracking-tight text-sm md:text-base">
            Mandar <span className="font-serif-italic text-primary-glow">Hirphode</span>
          </span>
        </a>

        <ul className="hidden md:flex gap-1 font-display text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor="hover"
                className="px-3 py-1.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/Mandar_Hirphode_Resume.pdf"
          download
          data-cursor="hover"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm shine hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)] transition-all"
        >
          Resume ↗
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-cursor="hover"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-5 pb-4 font-display animate-fade-in">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded-lg text-foreground/80 hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Mandar_Hirphode_Resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="block mt-1 py-2 px-3 rounded-lg bg-primary text-primary-foreground font-semibold text-center"
            >
              Download Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
