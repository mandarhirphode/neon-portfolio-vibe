import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeader } from "./About";

const Contact = () => (
  <section id="contact" className="relative py-24">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="// 05" title="Get In Touch" />

      <div className="max-w-3xl mx-auto neon-card rounded-2xl p-8 md:p-12 text-center animate-scale-in relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative">
          <p className="font-mono-code text-primary text-sm mb-3">{"> ./connect.sh"}</p>
          <h3 className="font-display text-3xl md:text-4xl font-black mb-4">
            Let's build something <span className="neon-text">data-driven</span>.
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Open to data analyst, BI, and analytics-engineering opportunities. Let's talk dashboards, pipelines, and
            energy intelligence.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8 font-mono-code text-sm">
            <a href="mailto:mandarhirphode@gmail.com" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-primary/30 hover:border-primary hover:bg-primary/5 transition-all glow-on-hover">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-xs break-all">mandarhirphode@gmail.com</span>
            </a>
            <a href="tel:+919420662327" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-primary/30 hover:border-primary hover:bg-primary/5 transition-all glow-on-hover">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-xs">+91 94206 62327</span>
            </a>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-primary/30">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-xs">Pune, India</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="mailto:mandarhirphode@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono-code font-bold uppercase tracking-wider shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary))] transition-all"
            >
              <Mail className="w-4 h-4" /> Say Hello
            </a>
            <a href="https://github.com/mandarhirphode" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-12 h-12 flex items-center justify-center rounded-lg border border-primary/40 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/mandar-hirphode" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-12 h-12 flex items-center justify-center rounded-lg border border-primary/40 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center font-mono-code text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Mandar Hirphode · Built with <span className="text-primary">▸</span> React & Tailwind</div>
        <div className="mt-1 text-primary/60">{"<"}/ data is the new oxygen {">"}</div>
      </footer>
    </div>
  </section>
);

export default Contact;
