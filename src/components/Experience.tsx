import { SectionHeader } from "./About";

const jobs = [
  {
    role: "Data Analyst",
    company: "Integrated Active Monitoring",
    location: "Pune",
    period: "Jan 2025 — Present",
    bullets: [
      "Built real-time IoT monitoring dashboards in Grafana for BMS KPIs — energy, temperature, AQI (CO2, PM2.5), lift utilities, and MCB status across 5+ enterprise clients.",
      "Developed IPMVP-compliant regression models in Python for energy baseline calculation — improving optimisation accuracy by 15%.",
      "Designed Power BI forecasting dashboards for energy consumption and peak demand, reducing client penalty costs by 10%.",
      "Engineered PostgreSQL ↔ Python ↔ Grafana / Power BI pipelines integrating InfluxDB time-series, saving 10+ manual hours/week.",
      "Contributed to ESG/ASHRAE product development by defining KPIs for the BMS web portal.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "RajYug IT Solutions",
    location: "Pune",
    period: "Sept — Dec 2024",
    bullets: [
      "Built Power BI and Tableau dashboards for Travel, Oil & Gas, and Real Estate sectors using advanced DAX & Power Query.",
      "Developed ETL pipelines using Microsoft Fabric and SSIS.",
      "Built ML regression and classification models for demand forecasting and predictive maintenance — improving forecast reliability by 12%.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "YBI Foundation",
    location: "Remote",
    period: "May — July 2024",
    bullets: [
      "Performed EDA, data cleaning, and clustering using Python.",
      "Built churn prediction models and customer behaviour dashboards in Power BI.",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="relative py-24">
    <div className="container mx-auto px-6">
      <SectionHeader kicker="// 03" title="Experience" />

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_10px_hsl(var(--primary))]" />

        {jobs.map((job, i) => (
          <div
            key={job.company}
            className={`relative mb-12 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"} pl-12`}
          >
            {/* Dot */}
            <div className={`absolute top-6 ${i % 2 === 0 ? "md:-right-2" : "md:-left-2"} left-2.5 md:left-auto w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary))] animate-glow-pulse`} />
            <div className="neon-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="font-mono-code text-xs text-primary tracking-wider mb-2">{job.period}</div>
              <h3 className="font-display text-xl font-bold">{job.role}</h3>
              <div className="text-primary-glow text-sm mb-4">
                {job.company} <span className="text-muted-foreground">· {job.location}</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-primary mt-1.5 text-xs">●</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
