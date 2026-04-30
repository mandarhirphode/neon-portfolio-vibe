import { ExternalLink, Github } from "lucide-react";
import { SectionHeader } from "./About";

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
    desc: "Content-based recommender using TF-IDF vectorisation and cosine similarity with 85% accuracy. Streamlit prototype + A/B logging.",
    tags: ["Python", "Scikit-learn", "Streamlit", "TF-IDF"],
    href: "https://github.com/mandyhirphode/movie_recommender_system",
  },
  {
    title: "Global Terrorism DB — EDA",
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
    desc: "Trend analysis, rating patterns, and match performance insights using Python — uncovering behavioural and performance signals.",
    tags: ["Python", "Pandas", "Matplotlib"],
    href: "https://github.com/mandarhirphode",
  },
];

const Projects = () => (
  <section id="projects" className="relative py-24 bg-card/30">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="// 04" title="Projects" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="neon-card group rounded-xl p-6 flex flex-col gap-4 animate-fade-in relative overflow-hidden"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent blur-2xl group-hover:from-primary/60 transition-all" />
            <div className="flex items-start justify-between relative">
              <div className="font-mono-code text-primary text-xs tracking-widest">PROJECT_0{i + 1}</div>
              <div className="flex gap-2 text-muted-foreground">
                <Github className="w-4 h-4 group-hover:text-primary transition-colors" />
                <ExternalLink className="w-4 h-4 group-hover:text-primary transition-colors" />
              </div>
            </div>
            <h3 className="font-display text-xl font-bold group-hover:neon-text transition-all">{p.title}</h3>
            <p className="text-sm text-muted-foreground flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs rounded-md font-mono-code bg-primary/10 border border-primary/30 text-primary">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
