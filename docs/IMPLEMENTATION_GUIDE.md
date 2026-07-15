# CourtDate Calculator Implementation Guide

## Use Case

CourtDate Calculator helps litigators and legal support teams calculate litigation deadlines from trigger dates. It is useful for docketing, case intake, paralegal workflows, and deadline quality checks.

## How It Works

The app accepts:

- trigger date
- jurisdiction/rule set

It returns calculated deadlines and adjusts dates that fall on weekends or configured holidays.

## Run Locally

```powershell
npm install
npm run dev
npm test
```

## Implementation Notes

Deadline rules live in `src/deadlines.ts`. The React interface lives in `src/App.tsx`.

To extend it:

- Add jurisdictions to the `Jurisdiction` type.
- Add new rule entries to the `rules` map.
- Replace the static holiday list with a court-calendar API.
- Add export to ICS, CSV, or docketing systems.

## Production Path

A production version should support court-specific holidays, service methods, backward-counting deadlines, emergency rules, audit logs, and attorney review before calendar entry creation.
