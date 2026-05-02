import { describe, expect, it } from "vitest";
import { getPortfolioChatResponse } from "./portfolioKnowledge";

describe("portfolio chatbot knowledge", () => {
  it("answers experience questions with current work context", () => {
    const response = getPortfolioChatResponse("What is Mandar's experience at Integrated Active Monitoring?");

    expect(response.text).toContain("Integrated Active Monitoring");
    expect(response.text).toContain("Grafana");
  });

  it("answers current organisation questions with the exact company", () => {
    const response = getPortfolioChatResponse("tell me mandar's current organisation");

    expect(response.text).toBe(
      "Mandar's current organization is Integrated Active Monitoring in Pune, where he works as a Data Analyst.",
    );
  });

  it("answers experience duration questions even with common typos", () => {
    const response = getPortfolioChatResponse("how much experaince he has");

    expect(response.text).toContain("1+ year of production experience");
    expect(response.text).toContain("about 2 years of hands-on data, BI, and ML experience");
  });

  it("answers contact questions with actionable links", () => {
    const response = getPortfolioChatResponse("How can I contact him?");

    expect(response.text).toContain("mandarhirphode@gmail.com");
    expect(response.links?.some((link) => link.href.startsWith("mailto:"))).toBe(true);
  });

  it("falls back for unknown questions", () => {
    const response = getPortfolioChatResponse("What is his favorite lunch?");

    expect(response.text).toContain("experience");
    expect(response.links?.length).toBeGreaterThan(0);
  });
});
