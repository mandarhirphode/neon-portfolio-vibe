import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "1+", label: "Years in production" },
  { value: "5+", label: "Enterprise clients" },
  { value: "10+", label: "Hrs saved / week" },
  { value: "15%", label: "Energy accuracy ↑" },
];

const About = () => (
  <section id="about" className="relative py-28">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="01 — About" title="A short" italic="story." />

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <Reveal className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/75">
          <p>
            I'm a <span className="text-foreground">Data Analyst</span> based in Pune, working at the intersection of
            <span className="font-serif-italic text-primary-glow"> energy</span>, IoT, and business intelligence.
          </p>
          <p>
            At Integrated Active Monitoring I build real-time dashboards in Grafana and Power BI, design IPMVP-compliant
            regression models for energy baselines, and engineer PostgreSQL ↔ Python ↔ InfluxDB pipelines that quietly
            save my team double-digit hours each week.
          </p>
          <p className="text-foreground/60">
            Off-screen I'm a curious learner — currently going deep on Snowflake, PyTorch, and modern data stack tooling.
          </p>

          <ul className="grid sm:grid-cols-2 gap-3 pt-4 font-mono-code text-sm text-foreground/70">
            <li className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-primary-glow" /> Pune, India</li>
            <li className="flex items-center gap-2.5"><Briefcase className="w-4 h-4 text-primary-glow" /> Integrated Active Monitoring</li>
            <li className="flex items-center gap-2.5"><GraduationCap className="w-4 h-4 text-primary-glow" /> IIT Guwahati — DS & AI</li>
            <li className="flex items-center gap-2.5"><Award className="w-4 h-4 text-primary-glow" /> Employee of the Month · Nov 2025</li>
          </ul>
        </Reveal>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 200} className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text">{s.value}</div>
              <div className="mt-3 text-xs uppercase tracking-wider text-foreground/55 font-mono-code">{s.label}</div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-primary/15 blur-2xl" />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
