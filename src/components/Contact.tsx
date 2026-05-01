import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const Contact = () => (
  <section id="contact" className="relative py-28">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="05 — Contact" title="Let's make" italic="something." />

      <Reveal className="max-w-4xl">
        <div className="glass-card rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-glow/20 blur-3xl rounded-full" />

          <div className="relative">
            <h3 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-6 text-balance">
              Got data?{" "}
              <span className="font-serif-italic gradient-text">Let's talk.</span>
            </h3>
            <p className="text-foreground/65 max-w-xl text-lg mb-10">
              Open to data analyst, BI, and analytics-engineering roles — and always happy to chat about dashboards,
              pipelines, or energy intelligence.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-10">
              <a
                href="mailto:mandarhirphode@gmail.com"
                data-cursor="hover"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all"
              >
                <Mail className="w-5 h-5 text-primary-glow shrink-0" />
                <span className="font-mono-code text-xs text-foreground/80 truncate">mandarhirphode@gmail.com</span>
              </a>
              <a
                href="tel:+919420662327"
                data-cursor="hover"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all"
              >
                <Phone className="w-5 h-5 text-primary-glow shrink-0" />
                <span className="font-mono-code text-xs text-foreground/80">+91 94206 62327</span>
              </a>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <MapPin className="w-5 h-5 text-primary-glow shrink-0" />
                <span className="font-mono-code text-xs text-foreground/80">Pune, India</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:mandarhirphode@gmail.com"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-display font-semibold shine hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)] transition-all"
              >
                <Mail className="w-4 h-4" /> Say hello
              </a>
              <a
                href="https://github.com/mandarhirphode"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                data-cursor="hover"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 hover:bg-white/10 hover:border-primary/50 hover:text-primary-glow transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mandar-hirphode"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                data-cursor="hover"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 hover:bg-white/10 hover:border-primary/50 hover:text-primary-glow transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between font-mono-code text-xs text-foreground/40">
        <div>© {new Date().getFullYear()} Mandar Hirphode</div>
        <div className="font-serif-italic text-foreground/60">data is the new oxygen</div>
      </footer>
    </div>
  </section>
);

export default Contact;
