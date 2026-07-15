import { useMemo, useState } from "react";
import { calculateDeadlines, Jurisdiction } from "./deadlines";
import "./styles.css";

const jurisdictions: Array<{ value: Jurisdiction; label: string }> = [
  { value: "federal-civil", label: "Federal civil" },
  { value: "california-civil", label: "California civil" },
  { value: "new-york-civil", label: "New York civil" }
];

export default function App() {
  const [startDate, setStartDate] = useState("2026-07-15");
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("federal-civil");
  const deadlines = useMemo(() => calculateDeadlines(startDate, jurisdiction), [startDate, jurisdiction]);

  return (
    <main className="shell">
      <section className="panel">
        <h1>CourtDate Calculator</h1>
        <div className="controls">
          <label>
            Trigger date
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </label>
          <label>
            Jurisdiction
            <select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value as Jurisdiction)}>
              {jurisdictions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>
        </div>
      </section>
      <section className="results">
        {deadlines.map((deadline) => (
          <article key={deadline.label} className="deadline">
            <span>{deadline.rule}</span>
            <strong>{deadline.label}</strong>
            <time>{deadline.dueDate}</time>
          </article>
        ))}
      </section>
    </main>
  );
}
