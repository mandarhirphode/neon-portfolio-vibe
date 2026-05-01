import { useEffect } from "react";
import About from "@/components/About";
import AmbientBackground from "@/components/AmbientBackground";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";

const Index = () => {
  useEffect(() => {
    document.title = "Mandar Hirphode — Data Analyst & ML Engineer | BI, IoT & Predictive Models";
    const desc =
      "Data Analyst & Machine Learning Engineer building real-time IoT dashboards, predictive energy models and ML pipelines in Python, PyTorch, Power BI and SQL.";
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
      <Preloader />
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
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
