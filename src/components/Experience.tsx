import Reveal from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const jobs = [
  {
    role: "Data Analyst",
    company: "Integrated Active Monitoring",
    location: "Pune",
    period: "Jan 2025 — Present",
    bullets: [
      "Built real-time IoT dashboards in Grafana for BMS KPIs — energy, AQI, lift utilities, MCB status across 5+ enterprise clients.",
      "Developed IPMVP-compliant regression models in Python — improved energy optimisation accuracy by 15%.",
      "Designed Power BI forecasting dashboards for energy consumption, reducing client penalty costs by 10%.",
      "Engineered PostgreSQL ↔ Python ↔ Grafana / Power BI pipelines integrating InfluxDB time-series, saving 10+ hours/week.",
      "Contributed to ESG/ASHRAE product development by defining KPIs for the BMS web portal.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "RajYug IT Solutions",
    location: "Pune",
    period: "Sept — Dec 2024",
    bullets: [
      "Built Power BI and Tableau dashboards for Travel, Oil & Gas, and Real Estate sectors using DAX & Power Query.",
      "Developed ETL pipelines using Microsoft Fabric and SSIS.",
      "Built ML regression and classification models — improving forecast reliability by 12%.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "YBI Foundation",
    location: "Remote",
    period: "May — July 2024",
    bullets: [
      "Performed EDA, data cleaning and clustering using Python.",
      "Built churn prediction models and customer behaviour dashboards in Power BI.",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="relative py-28">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="03 — Work" title="Where I've" italic="shipped." />

      <div className="space-y-4 max-w-5xl">
        {jobs.map((job, i) => (
          <Reveal key={job.company} delay={i * 250}>
            <article className="glass-card rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-6 group">
              <div className="md:col-span-4">
                <div className="font-mono-code text-xs text-primary-glow tracking-widest mb-2">{job.period}</div>
                <h3 className="font-display text-2xl font-bold leading-tight">{job.role}</h3>
                <div className="mt-1 text-foreground/70">{job.company}</div>
                <div className="text-sm text-foreground/45 font-mono-code">{job.location}</div>
              </div>
              <ul className="md:col-span-8 space-y-2.5 text-foreground/70 text-[15px] leading-relaxed">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-primary-glow shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-primary-glow" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
