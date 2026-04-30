import { SectionHeader } from "./About";
import { BarChart3, Brain, Code2, Database, LineChart, Server } from "lucide-react";

const groups = [
  {
    icon: BarChart3,
    title: "BI & Visualisation",
    items: ["Power BI (DAX, Power Query)", "Grafana (Dashboards, Alerting)", "Tableau", "Looker Studio", "Advanced Excel"],
  },
  {
    icon: Database,
    title: "Databases & SQL",
    items: ["PostgreSQL", "InfluxDB (Flux, InfluxQL)", "MySQL", "MS SQL Server", "Snowflake (learning)"],
  },
  {
    icon: Code2,
    title: "Programming & ETL",
    items: ["Python (Pandas, NumPy, Matplotlib)", "Scikit-learn", "ETL Scripting", "Microsoft Fabric", "SSIS"],
  },
  {
    icon: Brain,
    title: "Analytics & ML",
    items: ["IPMVP Regression", "Energy Forecasting", "Time-Series Analysis", "Clustering / EDA", "Predictive Modelling"],
  },
  {
    icon: Server,
    title: "Domain & Tools",
    items: ["BMS Systems", "ESG / ASHRAE Standards", "Azure", "Dimensional Modelling", "Real-time IoT Ingestion"],
  },
  {
    icon: LineChart,
    title: "Currently Learning",
    items: ["Snowflake", "PyTorch", "Advanced LLM Pipelines", "dbt", "MLOps"],
  },
];

const marqueeTags = [
  "Python", "SQL", "Power BI", "Grafana", "PostgreSQL", "InfluxDB", "Tableau", "Snowflake",
  "Azure", "Pandas", "NumPy", "Scikit-learn", "DAX", "Power Query", "SSIS", "Microsoft Fabric",
  "ETL", "IPMVP", "ESG", "IoT", "Time-Series", "Forecasting", "Clustering",
];

const Skills = () => (
  <section id="skills" className="relative py-24 bg-card/30">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="// 02" title="Tech Stack" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g, i) => (
          <div
            key={g.title}
            className="neon-card rounded-xl p-6 group animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/40 flex items-center justify-center text-primary group-hover:animate-glow-pulse">
                <g.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg">{g.title}</h3>
            </div>
            <ul className="space-y-2 font-mono-code text-sm text-muted-foreground">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Infinite marquee */}
    <div className="mt-16 relative overflow-hidden border-y border-primary/30 py-4 bg-background/60">
      <div className="flex gap-6 w-max animate-marquee">
        {[...marqueeTags, ...marqueeTags].map((tag, i) => (
          <span key={i} className="font-display text-2xl md:text-3xl font-black uppercase whitespace-nowrap text-foreground/30 hover:text-primary transition-colors">
            {tag} <span className="text-primary mx-3">◆</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
