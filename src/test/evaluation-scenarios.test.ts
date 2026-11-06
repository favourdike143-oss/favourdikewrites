import { describe, expect, it } from "vitest";
import { evaluationDimensions, evaluationScenarios } from "@/lib/evaluation-scenarios";

describe("portfolio evaluation examples", () => {
  it("scores every fictional response on the five requested dimensions", () => {
    expect(evaluationDimensions).toEqual([
      "Relevance",
      "Accuracy",
      "Helpfulness",
      "Contextual understanding",
      "Personalization",
    ]);
    for (const scenario of evaluationScenarios) {
      expect(scenario.responses).toHaveLength(2);
      for (const response of scenario.responses) {
        expect(Object.keys(response.ratings)).toEqual(evaluationDimensions);
        expect(Object.values(response.ratings).every((rating) => rating >= 1 && rating <= 5)).toBe(true);
      }
    }
  });

  it("recommends the stronger response in each self-directed fictional demonstration", () => {
    for (const scenario of evaluationScenarios) {
      const selected = scenario.responses.find((response) => response.id === scenario.recommendation);
      const alternative = scenario.responses.find((response) => response.id !== scenario.recommendation);
      expect(selected).toBeDefined();
      expect(alternative).toBeDefined();
      expect(selected?.ratings.Accuracy).toBeGreaterThanOrEqual(alternative?.ratings.Accuracy ?? 6);
      expect(selected?.ratings.Relevance).toBeGreaterThanOrEqual(alternative?.ratings.Relevance ?? 6);
    }
  });
});