import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/mh-logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-primary/30 shadow-[0_0_20px_hsl(142_100%_50%/0.2)]" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 group">
          <img src={logo} alt="Mandar Hirphode logo" width={40} height={40} className="w-10 h-10 drop-shadow-[0_0_8px_hsl(var(--primary))] group-hover:drop-shadow-[0_0_14px_hsl(var(--accent-blue))] transition-all" />
          <span className="font-display text-lg font-bold gradient-tri tracking-widest hidden sm:inline">MANDAR</span>
        </a>
        <ul className="hidden md:flex gap-8 font-mono-code text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-foreground/80 hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-primary after:shadow-[0_0_10px_hsl(var(--primary))] hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-primary" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 font-mono-code bg-background/95 border-t border-primary/30 animate-fade-in">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-foreground/80 hover:text-primary">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
