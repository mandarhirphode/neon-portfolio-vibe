import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "2+", label: "Years in production" },
  { value: "20+", label: "Enterprise clients" },
  { value: "<1%", label: "Data error rate" },
  { value: "85-93%", label: "Forecast accuracy" },
];

const About = () => (
  <section id="about" className="relative py-28">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="01 — About" title="A short" italic="story." />

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <Reveal className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/75">
          <p>
            I'm a <span className="text-foreground">Data Analyst</span> based in Pune, turning
            <span className="font-serif-italic text-primary-glow"> SQL, Python & BI dashboards</span> into decisions
            for enterprise clients across BFSI, Financial Services, Retail and Industrial IoT.
          </p>
          <p>
            At Integrated Active Monitoring I own analytics across 3 enterprise accounts — cutting data error rates
            from ~8% to under 1%, shrinking MIS turnaround from 2 days to same-day via Python + n8n automation, and
            delivering 10-12% energy savings through IPMVP regression forecasting at 85-93% accuracy.
          </p>
          <p className="text-foreground/60">
            GenAI practitioner shipping LangChain + RAG + ChromaDB apps on top of Llama 3. IIT Guwahati certified,
            Employee of the Month 2025, and always building the next dashboard, pipeline or model.
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
