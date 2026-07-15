export type Jurisdiction = "federal-civil" | "california-civil" | "new-york-civil";

export type DeadlineResult = {
  label: string;
  dueDate: string;
  rule: string;
};

const rules: Record<Jurisdiction, Array<{ label: string; days: number; rule: string }>> = {
  "federal-civil": [
    { label: "Answer to complaint", days: 21, rule: "FRCP 12(a)(1)(A)" },
    { label: "Notice of appeal", days: 30, rule: "FRAP 4(a)(1)(A)" }
  ],
  "california-civil": [
    { label: "Answer to complaint", days: 30, rule: "Cal. Civ. Proc. Code 412.20" },
    { label: "Opposition to motion", days: 9, rule: "Cal. Civ. Proc. Code 1005(b)" }
  ],
  "new-york-civil": [
    { label: "Answer after personal service", days: 20, rule: "CPLR 320(a)" },
    { label: "Notice of appeal", days: 30, rule: "CPLR 5513(a)" }
  ]
};

const holidays = new Set(["2026-01-01", "2026-07-03", "2026-12-25"]);

export function calculateDeadlines(startDate: string, jurisdiction: Jurisdiction): DeadlineResult[] {
  return rules[jurisdiction].map((rule) => ({
    label: rule.label,
    dueDate: addCourtDays(startDate, rule.days),
    rule: rule.rule
  }));
}

export function addCourtDays(startDate: string, days: number): string {
  const date = new Date(`${startDate}T12:00:00`);
  date.setDate(date.getDate() + days);
  while (isWeekend(date) || holidays.has(toIsoDate(date))) {
    date.setDate(date.getDate() + 1);
  }
  return toIsoDate(date);
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
