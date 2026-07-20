import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import photo from "@/assets/mandar-photo.png";
import Typewriter from "./Typewriter";


const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative">
        {/* Left content */}
        <div className="lg:col-span-7 space-y-7">
          <div className="reveal-mask">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono-code">
              <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
              <span className="text-foreground/80">Open to Data Analyst & BI roles</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-glow animate-pulse-soft" />
            </div>
          </div>

          <div>
            <h1 className="font-display font-bold leading-[0.95] tracking-tight text-balance">
              <span className="reveal-mask block text-5xl md:text-7xl lg:text-8xl">
                <span>I turn messy</span>
              </span>
              <span className="reveal-mask block text-5xl md:text-7xl lg:text-8xl" style={{ animationDelay: "0.15s" }}>
                <span>
                  <span className="font-serif-italic gradient-text">data</span> into
                </span>
              </span>
              <span className="reveal-mask block text-5xl md:text-7xl lg:text-8xl" style={{ animationDelay: "0.3s" }}>
                <span>decisions.</span>
              </span>
            </h1>
          </div>

          <div className="text-xl md:text-2xl min-h-[2rem] text-foreground/80 reveal-mask" style={{ animationDelay: "0.4s" }}>
            <span className="text-foreground/50">{"// "}</span>
            <Typewriter />
          </div>

          <p className="text-foreground/60 max-w-xl leading-relaxed text-pretty reveal-mask" style={{ animationDelay: "0.5s" }}>
            Hey, I'm <span className="text-foreground font-medium">Mandar</span> — a data analyst turning SQL, Python
            and Power BI / Grafana dashboards into decisions for 20+ enterprise clients across BFSI, financial services
            and industrial IoT. GenAI practitioner. Based in Pune.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 reveal-mask" style={{ animationDelay: "0.6s" }}>
            <a
              href="#projects"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold shine hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)] transition-all"
            >
              See my work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="/Mandar_Hirphode_Resume.pdf"
              download
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-foreground font-display font-semibold hover:bg-white/10 hover:border-white/30 transition-all"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
          </div>

          <div className="flex items-center gap-5 pt-3 reveal-mask" style={{ animationDelay: "0.7s" }}>
            {[
              { icon: Github, href: "https://github.com/mandarhirphode", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mandar-hirphode", label: "LinkedIn" },
              { icon: Mail, href: "mailto:mandarhirphode@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor="hover"
                className="text-foreground/50 hover:text-primary-glow transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right photo card */}
        <div className="lg:col-span-5 relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative aspect-[4/5] max-w-[300px] md:max-w-[340px] mx-auto">
            {/* Decorative glow */}
            <div className="absolute -inset-8 bg-primary/30 blur-3xl rounded-full opacity-60 animate-pulse-soft" />


            {/* Photo frame */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 noise-overlay">
              <img
                src={photo}
                alt="Mandar Hirphode portrait"
                className="w-full h-full object-cover"
                width={480}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              {/* tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="font-mono-code text-xs text-primary-glow">PUNE · IN</div>
                  <div className="font-display font-bold text-lg text-white">Mandar Hirphode</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-mono-code font-bold uppercase tracking-wider">
                  ● Live
                </span>
              </div>
            </div>

            {/* Floating chips */}
            <div
              className="absolute -left-6 top-12 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 font-mono-code text-xs animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              📊 Power BI
            </div>
            <div
              className="absolute -right-4 bottom-32 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 font-mono-code text-xs animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              🦜 LangChain
            </div>
            <div
              className="absolute -left-8 bottom-16 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 font-mono-code text-xs animate-float"
              style={{ animationDelay: "1.8s" }}
            >
              🗃️ SQL
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40 text-xs font-mono-code">
        <span>scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
