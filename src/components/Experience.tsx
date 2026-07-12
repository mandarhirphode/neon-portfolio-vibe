import Reveal from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const jobs = [
  {
    role: "Data Analyst — Employee of the Month 2025",
    company: "Integrated Active Monitoring",
    location: "Pune · BFSI · Retail · Industrial IoT",
    period: "Jan 2025 — Present",
    bullets: [
      "Reduced data error rate from ~8% to under 1% across 3 production databases via a SQL-based KPI validation & governance framework.",
      "Cut MIS report delivery from 2 days to same-day for 20+ enterprise clients using Python + n8n automation replacing 5-7 manual daily reports.",
      "Delivered 10-12% average energy savings across 50+ clients with Python regression forecasting models at 85-93% accuracy for IPMVP baselines.",
      "Shipped 25+ production Power BI & Grafana dashboards across 15+ BMS utility types — tracking 500+ portal users.",
      "Standardised SQL reporting, schema docs and data dictionaries — cut ad-hoc query resolution time by ~35%.",
    ],
  },
  {
    role: "MIS Executive · Data Analyst — Investments & Insurance",
    company: "Motilal Oswal Authorised Partner",
    location: "Pune · BFSI · Financial Services",
    period: "Jun 2024 — Dec 2024",
    bullets: [
      "Reduced manual MIS effort by 40% for 50+ client accounts via Advanced Excel dashboards (Pivot Tables, Power Query, VLOOKUP).",
      "Achieved 100% on-time delivery of daily, weekly & monthly MIS reports with a structured reporting calendar.",
      "Improved client data integrity by 30% through cross-validation and reconciliation across equity, mutual fund and insurance data.",
      "Saved 8-10 hours/week by automating recurring MIS workflows with Excel Macros and formula-driven templates.",
      "Built KPI tracking dashboards for AUM growth, SIP inflows, revenue and policy renewals — adopted for weekly reviews.",
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
