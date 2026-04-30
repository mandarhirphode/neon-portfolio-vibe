import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "1+" },
  { label: "Enterprise Clients", value: "5+" },
  { label: "Hours Saved / Week", value: "10+" },
  { label: "Energy Accuracy ↑", value: "15%" },
];

const About = () => (
  <section id="about" className="relative py-24">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="// 01" title="About Me" />

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed animate-fade-in">
          <p>
            I'm a <span className="text-primary font-semibold">Data Analyst</span> with hands-on production experience in
            energy-tech and Building Management Systems (BMS). I specialise in IoT time-series analytics, real-time
            monitoring, ESG/IPMVP energy baseline modelling, and end-to-end BI pipelines across Power BI, Grafana, and
            SQL.
          </p>
          <p>
            I've delivered measurable outcomes for enterprise clients across <span className="text-primary-glow">energy</span>,{" "}
            <span className="text-primary-glow">real estate</span>, and <span className="text-primary-glow">smart-building</span>{" "}
            domains. IIT Guwahati certified in Full Stack Data Science & AI, currently expanding into Snowflake and PyTorch.
          </p>

          <ul className="grid sm:grid-cols-2 gap-3 pt-2 font-mono-code text-sm">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Pune, India</li>
            <li className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> Integrated Active Monitoring</li>
            <li className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /> IIT Guwahati — DS & AI</li>
            <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Employee of the Month — Nov 2025</li>
          </ul>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="neon-card rounded-xl p-5 text-center animate-scale-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="font-display text-3xl md:text-4xl font-black neon-text">{s.value}</div>
              <div className="font-mono-code text-xs text-muted-foreground mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const SectionHeader = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="mb-12">
    <div className="font-mono-code text-primary text-sm tracking-widest mb-2">{kicker}</div>
    <h2 className="font-display text-4xl md:text-5xl font-black neon-text inline-block">
      {title}
    </h2>
    <div className="mt-4 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent" />
  </div>
);

export default About;
