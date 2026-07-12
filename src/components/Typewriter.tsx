import { useEffect, useState } from "react";

const phrases = [
  "Data Analyst",
  "SQL · Python · Power BI",
  "BFSI & Energy Analytics",
  "GenAI · LangChain · RAG",
  "Forecasting & Automation",
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[i % phrases.length];
    const speed = del ? 35 : 75;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI(i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="font-mono-code">
      <span className="gradient-text">{text}</span>
      <span className="text-primary animate-blink">▋</span>
    </span>
  );
};

export default Typewriter;
