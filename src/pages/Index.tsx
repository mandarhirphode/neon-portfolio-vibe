import { useEffect } from "react";
import About from "@/components/About";
import CodeRain from "@/components/CodeRain";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

const Index = () => {
  useEffect(() => {
    document.title = "Mandar Hirphode — Data Analyst | BI & Energy-Tech Portfolio";
    const desc = "Data Analyst specialising in BI, IoT time-series analytics, ESG/IPMVP energy intelligence, Power BI, Grafana and SQL pipelines.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    const canonicalHref = window.location.origin + "/";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);
  }, []);

  return (
    <main className="relative">
      <CodeRain />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;
