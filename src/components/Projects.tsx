import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const projects = [
  {
    title: "Croma Retail Data Warehouse",
    desc: "End-to-end Snowflake + Azure warehouse with Snowpipe ingestion, dimensional modelling, and KPI analytics for sales, inventory & CLV.",
    tags: ["Snowflake", "Azure", "Snowpipe", "Dimensional Modelling"],
    href: "https://github.com/mandarhirphode",
  },
  {
    title: "End-to-End Analytics Pipeline",
    desc: "Python → SQL → Power BI pipeline delivering real-time business insights — boosted decision-making efficiency by 20%.",
    tags: ["Python", "SQL", "Power BI", "ETL"],
    href: "https://github.com/mandarhirphode",
  },
  {
    title: "Movie Recommender System",
    desc: "Content-based recommender using TF-IDF and cosine similarity at 85% accuracy. Streamlit prototype + A/B logging.",
    tags: ["Python", "Scikit-learn", "Streamlit", "TF-IDF"],
    href: "https://github.com/mandyhirphode/movie_recommender_system",
  },
  {
    title: "Global Terrorism — EDA",
    desc: "EDA, dashboards and derived metrics for trend analysis on the Global Terrorism dataset.",
    tags: ["Python", "Pandas", "EDA", "Power BI"],
    href: "https://github.com/mandyhirphode/EDA_on_global_terrorism_data-",
  },
  {
    title: "Amazon Sales — Dashboards & Forecasts",
    desc: "Power BI dashboards combined with short-term forecasting models for sales planning and inventory decisions.",
    tags: ["Power BI", "Forecasting", "DAX"],
    href: "https://github.com/mandyhirphode/Amazon-Sales-Analysis-Dashboard",
  },
  {
    title: "IPL & Play Store EDA",
    desc: "Trend analysis, rating patterns and match performance insights using Python — uncovering behavioural signals.",
    tags: ["Python", "Pandas", "Matplotlib"],
    href: "https://github.com/mandarhirphode",
  },
];

const Projects = () => (
  <section id="projects" className="relative py-28">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="04 — Projects" title="Things I've" italic="built." />

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 220}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="glass-card group block rounded-2xl p-7 h-full relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-5 relative">
                <div className="font-mono-code text-xs text-primary-glow tracking-widest">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
                <div className="flex items-center gap-2 text-foreground/50 group-hover:text-foreground transition-colors">
                  <Github className="w-4 h-4" />
                  <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:gradient-text transition-colors">
                {p.title}
              </h3>
              <p className="text-foreground/65 leading-relaxed mb-5">{p.desc}</p>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-full font-mono-code bg-white/5 border border-white/10 text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
