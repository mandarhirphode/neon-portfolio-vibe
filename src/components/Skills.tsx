import { BarChart3, Brain, Code2, Database, LineChart, Server } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const groups = [
  {
    icon: BarChart3,
    title: "BI & Visualisation",
    items: ["Power BI · DAX · Power Query", "Grafana · Alerting", "Tableau", "Looker Studio", "Advanced Excel"],
  },
  {
    icon: Database,
    title: "Databases & SQL",
    items: ["PostgreSQL", "InfluxDB · Flux · InfluxQL", "MySQL", "MS SQL Server", "Snowflake (learning)"],
  },
  {
    icon: Code2,
    title: "Programming & ETL",
    items: ["Python · Pandas · NumPy", "Scikit-learn · Matplotlib", "ETL scripting", "Microsoft Fabric", "SSIS"],
  },
  {
    icon: Brain,
    title: "Analytics & ML",
    items: ["IPMVP regression", "Energy forecasting", "Time-series analysis", "Clustering · EDA", "Predictive modelling"],
  },
  {
    icon: Server,
    title: "Domain & Tools",
    items: ["BMS systems", "ESG · ASHRAE standards", "Azure", "Dimensional modelling", "Real-time IoT ingestion"],
  },
  {
    icon: LineChart,
    title: "Currently learning",
    items: ["Snowflake", "PyTorch", "LLM pipelines", "dbt", "MLOps"],
  },
];

const marqueeTags = [
  "Python", "SQL", "Power BI", "Grafana", "PostgreSQL", "InfluxDB", "Tableau", "Snowflake",
  "Azure", "Pandas", "Scikit-learn", "DAX", "Power Query", "Microsoft Fabric", "ETL",
  "IPMVP", "ESG", "IoT", "Time-Series", "Forecasting",
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
