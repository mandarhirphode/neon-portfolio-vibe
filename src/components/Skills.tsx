import { BarChart3, Brain, Code2, Database, LineChart, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import DataScatter3D from "./DataScatter3D";
import { SectionHeader } from "./SectionHeader";

const groups = [
  {
    icon: Database,
    title: "SQL & Databases",
    items: ["CTEs · Window Functions · Joins", "Query Optimisation", "PostgreSQL · MS SQL · MySQL", "Snowflake", "InfluxDB · Flux · InfluxQL"],
  },
  {
    icon: Code2,
    title: "Programming & Stats",
    items: ["Python · Pandas · NumPy", "Scikit-learn", "Statistical Analysis · EDA", "Regression · Classification", "Time-Series Forecasting"],
  },
  {
    icon: BarChart3,
    title: "BI & Visualisation",
    items: ["Power BI · DAX · Semantic Modeling", "Grafana · Alerting", "Tableau", "Looker Studio · Metabase", "Advanced Excel · Power Query"],
  },
  {
    icon: Sparkles,
    title: "GenAI",
    items: ["LangChain", "RAG pipelines", "ChromaDB (Vector DB)", "ChatGroq · Llama 3", "Prompt Engineering"],
  },
  {
    icon: Brain,
    title: "Reporting & Automation",
    items: ["ETL Pipelines · SSIS", "n8n Workflow Automation", "REST API Integration", "Microsoft Fabric", "Excel Macros · Templates"],
  },
  {
    icon: LineChart,
    title: "Domain & Tools",
    items: ["BFSI · Investments · Insurance", "Energy Analytics · IoT / BMS", "Retail Analytics", "Git · GitHub · Streamlit", "Azure DP-900 · PL-300 (WIP)"],
  },
];

const marqueeTags = [
  "SQL", "Python", "Power BI", "Grafana", "PostgreSQL", "Snowflake", "InfluxDB",
  "Pandas", "Scikit-learn", "LangChain", "RAG", "ChromaDB", "Llama 3",
  "n8n", "SSIS", "Microsoft Fabric", "DAX", "Streamlit", "Forecasting", "IPMVP",
];

const Skills = () => (
  <section id="skills" className="relative py-28">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="02 — Stack" title="Tools I" italic="actually use." />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 220} className="glass-card rounded-2xl p-6 group">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary-glow group-hover:scale-110 group-hover:bg-primary/30 transition-transform">
                <g.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg">{g.title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-foreground/65">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5">
                  <span className="text-primary-glow mt-1.5 text-[6px]">●</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        {/* 3D scatter/regression viz card */}
        <Reveal delay={groups.length * 220} className="glass-card rounded-2xl p-6 md:col-span-2 lg:col-span-3 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="font-mono-code text-xs text-primary-glow tracking-widest mb-3">// LIVE MODEL</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-3">
                Fitting <span className="font-serif-italic gradient-text">signal</span> through noise.
              </h3>
              <p className="text-foreground/65 text-sm leading-relaxed">
                A 3D scatter of observations with a fitted regression plane — the same class of models
                driving 85-93% forecasting accuracy on IPMVP energy baselines in production.
              </p>
            </div>
            <DataScatter3D height={260} />
          </div>
        </Reveal>
      </div>
    </div>

    {/* Animated tag cloud */}
    <div className="container mx-auto px-6 mt-20">
      <Reveal className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {marqueeTags.map((tag, i) => (
          <span
            key={tag}
            className="tag-pop px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm font-mono-code text-sm text-foreground/70 hover:text-primary-glow hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all cursor-default"
            style={{ animationDelay: `${i * 0.08}s` }}
            data-cursor="hover"
          >
            <span className="text-primary-glow mr-1.5">✦</span>
            {tag}
          </span>
        ))}
      </Reveal>
    </div>
  </section>
);

export default Skills;
