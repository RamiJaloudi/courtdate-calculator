import { describe, expect, it } from "vitest";
import { addCourtDays, calculateDeadlines } from "./deadlines";

describe("deadline calculations", () => {
  it("moves weekend due dates to Monday", () => {
    expect(addCourtDays("2026-07-10", 1)).toBe("2026-07-13");
  });

  it("calculates federal answer deadline", () => {
    expect(calculateDeadlines("2026-07-15", "federal-civil")[0].dueDate).toBe("2026-08-05");
  });
});
