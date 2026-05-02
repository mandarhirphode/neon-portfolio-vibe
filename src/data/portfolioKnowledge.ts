export type ChatLink = {
  label: string;
  href: string;
};

export type ChatResponse = {
  text: string;
  links?: ChatLink[];
};

type KnowledgeCard = ChatResponse & {
  title: string;
  keywords: string[];
};

export const quickPrompts = [
  "What roles is Mandar best fit for?",
  "Summarize his experience",
  "Which projects should I look at?",
  "How can I contact him?",
];

export const profileLinks: ChatLink[] = [
  { label: "Resume", href: "/Mandar_Hirphode_Resume.pdf" },
  { label: "GitHub", href: "https://github.com/mandarhirphode" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mandar-hirphode" },
  { label: "Email", href: "mailto:mandarhirphode@gmail.com" },
];

const knowledgeCards: KnowledgeCard[] = [
  {
    title: "experience duration",
    keywords: [
      "experience",
      "experaince",
      "expereince",
      "years",
      "year",
      "months",
      "duration",
      "total",
      "how much",
      "how many",
    ],
    text:
      "Mandar has 1+ year of production experience as a Data Analyst, plus internship experience from 2024. Overall, he has about 2 years of hands-on data, BI, and ML experience, with current production work at Integrated Active Monitoring since January 2025.",
  },
  {
    title: "current organization",
    keywords: [
      "current",
      "currently",
      "organisation",
      "organization",
      "company",
      "employer",
      "workplace",
      "work",
      "working",
      "works",
      "job",
      "now",
      "present",
      "where",
    ],
    text:
      "Mandar's current organization is Integrated Active Monitoring in Pune, where he works as a Data Analyst.",
  },
  {
    title: "overview",
    keywords: ["about", "overview", "summary", "profile", "who", "intro", "introduction"],
    text:
      "Mandar Hirphode is a Pune-based Data Analyst and ML Engineer focused on BI, IoT analytics, energy intelligence, and production data pipelines. He works with real-time BMS data, Power BI, Grafana, SQL, Python, and ML models that turn raw operational data into decisions.",
    links: profileLinks,
  },
  {
    title: "roles and hiring fit",
    keywords: ["role", "roles", "hire", "hiring", "job", "fit", "available", "open", "analyst", "engineer"],
    text:
      "Mandar is best aligned with Data Analyst, BI Analyst, Analytics Engineer, ML Engineer, and IoT analytics roles. His strongest fit is work that blends dashboards, SQL pipelines, Python analysis, forecasting, and stakeholder-ready reporting.",
    links: [
      { label: "Download resume", href: "/Mandar_Hirphode_Resume.pdf" },
      { label: "Email Mandar", href: "mailto:mandarhirphode@gmail.com" },
    ],
  },
  {
    title: "experience",
    keywords: [
      "experience",
      "work",
      "company",
      "companies",
      "organisation",
      "organization",
      "employer",
      "integrated",
      "active",
      "monitoring",
      "rajyug",
      "ybi",
      "internship",
      "current",
      "currently",
    ],
    text:
      "Mandar currently works as a Data Analyst at Integrated Active Monitoring in Pune. He builds real-time Grafana dashboards for BMS KPIs, IPMVP-compliant Python regression models for energy baselines, Power BI forecasting dashboards, and PostgreSQL/Python/InfluxDB pipelines that save 10+ hours per week.\n\nBefore that, he interned at RajYug IT Solutions, building BI dashboards, ETL pipelines with Microsoft Fabric and SSIS, and ML models. He also interned at YBI Foundation, working on EDA, clustering, churn prediction, and Power BI dashboards.",
  },
  {
    title: "skills",
    keywords: ["skill", "skills", "stack", "tools", "technology", "technologies", "python", "sql", "power", "bi", "grafana", "ml", "machine", "learning"],
    text:
      "His core stack includes Python, Pandas, NumPy, Scikit-learn, PyTorch, SQL, PostgreSQL, InfluxDB, Power BI, DAX, Power Query, Grafana, Tableau, Advanced Excel, Microsoft Fabric, SSIS, Azure, and Snowflake.\n\nThe practical sweet spot: BI dashboards, time-series analytics, ETL automation, regression, forecasting, clustering, recommender systems, and real-time IoT reporting.",
  },
  {
    title: "projects",
    keywords: ["project", "projects", "portfolio", "built", "github", "warehouse", "recommender", "amazon", "terrorism", "eda", "pipeline", "croma"],
    text:
      "Key projects include a Croma Retail Data Warehouse using Snowflake, Azure, Snowpipe, and dimensional modelling; an end-to-end Python to SQL to Power BI analytics pipeline that improved decision-making efficiency by 20%; a movie recommender using TF-IDF and cosine similarity with 85% accuracy; Global Terrorism EDA; Amazon sales dashboards and forecasts; plus IPL and Play Store EDA projects.",
    links: [
      { label: "GitHub profile", href: "https://github.com/mandarhirphode" },
      { label: "Movie recommender", href: "https://github.com/mandyhirphode/movie_recommender_system" },
      { label: "Amazon dashboard", href: "https://github.com/mandyhirphode/Amazon-Sales-Analysis-Dashboard" },
    ],
  },
  {
    title: "energy and iot",
    keywords: ["energy", "iot", "bms", "building", "management", "ipmvp", "ashrae", "esg", "baseline", "aqi", "influxdb", "grafana"],
    text:
      "Mandar has production experience in energy-tech and Building Management Systems. He tracks KPIs like energy, temperature, AQI, lift utilities, and MCB status; builds IPMVP-compliant baseline models with occupancy, CDD/HDD, and working-hour parameters; and contributes ESG/ASHRAE KPIs for BMS web portals.",
  },
  {
    title: "education",
    keywords: ["education", "degree", "college", "university", "certification", "iit", "guwahati", "btech", "study"],
    text:
      "Mandar completed Full Stack Data Science and AI certification from IIT Guwahati in 2024. He also holds a B.Tech from Shivaji University, completed in 2023.",
  },
  {
    title: "achievements",
    keywords: ["achievement", "achievements", "award", "awards", "impact", "numbers", "results", "metrics"],
    text:
      "A few measurable wins: dashboards and pipelines for 5+ enterprise clients, 10+ manual hours saved each week, 15% improvement in energy optimisation accuracy, 10% reduction in client penalty costs through forecasting dashboards, and 20% better decision-making efficiency from an analytics pipeline project.",
  },
  {
    title: "contact",
    keywords: ["contact", "email", "phone", "call", "linkedin", "reach", "message", "connect", "location"],
    text:
      "You can reach Mandar at mandarhirphode@gmail.com or +91 94206 62327. He is based in Pune, India, and is active on LinkedIn and GitHub.",
    links: [
      { label: "Email", href: "mailto:mandarhirphode@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mandar-hirphode" },
      { label: "GitHub", href: "https://github.com/mandarhirphode" },
    ],
  },
  {
    title: "resume",
    keywords: ["resume", "cv", "download", "pdf"],
    text:
      "Mandar's resume is available as a PDF. It covers his Data Analyst role at Integrated Active Monitoring, internships, BI/ML stack, energy-tech work, projects, and education.",
    links: [{ label: "Download resume", href: "/Mandar_Hirphode_Resume.pdf" }],
  },
];

const fallbackResponse: ChatResponse = {
  text:
    "I can answer questions about Mandar's experience, projects, skills, education, resume, and contact details. Try asking about his Power BI work, IoT dashboards, ML projects, or hiring fit.",
  links: profileLinks,
};

const greetingResponse: ChatResponse = {
  text:
    "Hi, I am Mandar's portfolio assistant. Ask me about his work experience, BI and ML stack, projects, resume, or how to contact him.",
};

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "can",
  "for",
  "has",
  "he",
  "his",
  "how",
  "i",
  "is",
  "me",
  "much",
  "of",
  "on",
  "or",
  "the",
  "to",
  "what",
  "with",
  "you",
]);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((token) => token.length > 1 && !stopWords.has(token));

export function getPortfolioChatResponse(input: string): ChatResponse {
  const question = input.trim();

  if (!question) {
    return greetingResponse;
  }

  const normalized = normalize(question);

  if (/^(hi|hello|hey|yo|namaste)\b/.test(normalized)) {
    return greetingResponse;
  }

  const asksCurrentWorkplace =
    /\b(current|currently|now|present)\b/.test(normalized) &&
    /\b(organisation|organization|company|employer|workplace|work|working|works|job)\b/.test(normalized);

  if (asksCurrentWorkplace) {
    return knowledgeCards[1];
  }

  const asksExperienceDuration =
    /\b(experience|experaince|expereince)\b/.test(normalized) &&
    /\b(how much|how many|year|years|month|months|duration|total)\b/.test(normalized);

  if (asksExperienceDuration) {
    return knowledgeCards[0];
  }

  const tokens = tokenize(question);
  let bestCard = knowledgeCards[0];
  let bestScore = 0;

  for (const card of knowledgeCards) {
    const keywordText = `${card.title} ${card.keywords.join(" ")}`;
    const keywordTokens = new Set(tokenize(keywordText));
    let score = 0;

    for (const token of tokens) {
      if (keywordTokens.has(token)) {
        score += 3;
      }

      if (keywordText.includes(token)) {
        score += 1;
      }
    }

    for (const keyword of card.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.includes(" ") ? 4 : 2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCard = card;
    }
  }

  return bestScore >= 2 ? bestCard : fallbackResponse;
}
