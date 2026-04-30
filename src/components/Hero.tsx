import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import photo from "@/assets/mandar-photo.png";
import Typewriter from "./Typewriter";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

      {/* scanning line */}
      <div className="absolute inset-x-0 -z-10 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_hsl(var(--primary))] animate-scan" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-sm font-mono-code text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-primary">AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-black leading-tight">
            <span className="block text-foreground">Hi, I'm</span>
            <span className="block neon-text animate-text-flicker">MANDAR</span>
            <span className="block gradient-text bg-[length:200%_auto] animate-gradient-shift">HIRPHODE</span>
          </h1>

          <div className="text-2xl md:text-3xl min-h-[2.5rem]">
            <Typewriter />
          </div>

          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Production data analyst delivering real-time IoT analytics, ESG/IPMVP energy intelligence, and BI pipelines
            for enterprise clients across energy, real-estate and smart-building domains.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono-code font-bold uppercase tracking-wider shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary))] transition-all hover:-translate-y-0.5"
            >
              View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/Mandar_Hirphode_Resume.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/60 text-primary font-mono-code font-bold uppercase tracking-wider hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
          </div>

          <div className="flex items-center gap-5 pt-4">
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
                className="text-muted-foreground hover:text-primary glow-on-hover transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div className="relative animate-fade-in-right flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-primary/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
            {/* Glow */}
            <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
            {/* Photo */}
            <div className="absolute inset-10 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_60px_hsl(var(--primary)/0.6)] animate-float">
              <img src={photo} alt="Mandar Hirphode" className="w-full h-full object-cover" />
            </div>
            {/* Floating chips */}
            <div className="absolute -top-2 -right-2 px-3 py-1.5 rounded-lg bg-card border border-primary/50 font-mono-code text-xs neon-text animate-float" style={{ animationDelay: "0.5s" }}>
              Power BI
            </div>
            <div className="absolute bottom-4 -left-4 px-3 py-1.5 rounded-lg bg-card border border-primary/50 font-mono-code text-xs neon-text animate-float" style={{ animationDelay: "1s" }}>
              Python
            </div>
            <div className="absolute top-1/2 -right-6 px-3 py-1.5 rounded-lg bg-card border border-primary/50 font-mono-code text-xs neon-text animate-float" style={{ animationDelay: "1.5s" }}>
              SQL
            </div>
            <div className="absolute -bottom-2 right-10 px-3 py-1.5 rounded-lg bg-card border border-primary/50 font-mono-code text-xs neon-text animate-float" style={{ animationDelay: "2s" }}>
              Grafana
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
