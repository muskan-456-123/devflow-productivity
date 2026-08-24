# DevFlow — Developer Productivity Dashboard

DevFlow is a responsive developer productivity dashboard created for **Innovation Hacks Full Stack Development Internship — Task 1**. It demonstrates a complete frontend product experience with accessible navigation, user identity, task progress, client-side search and filters, a focus timer, calendar view, and meaningful loading, empty, and error states.

The finished experience combines **Soft Signal Studio** with DevFlow’s original **Kinetic Workbench** system. Cloud-grey surroundings, white workspace boards, periwinkle orientation cues, and tactile paper-studio artwork establish a calm visual baseline. Ledger rules, calibration bands, stamped metadata, and **Flow Orange** momentum signals keep the interface specific to developer work rather than a generic wellness dashboard.

## Visual Preview

| Desktop workspace | Mobile workspace |
| --- | --- |
| ![DevFlow desktop dashboard](https://files.manuscdn.com/user_upload_by_module/session_file/310519663870362017/ieFjvlrlyTyMHtTd.png) | ![DevFlow mobile dashboard](https://files.manuscdn.com/user_upload_by_module/session_file/310519663870362017/fHTDtLsGsOgPsLLB.png) |

## What It Demonstrates

| Requirement | Implementation in DevFlow |
| --- | --- |
| Dashboard landing page | A daily developer workspace with a visual overview, focus instrument, calendar, current task queue, and commit note. |
| Accessible navigation | A persistent desktop rail and compact mobile menu provide labelled, keyboard-accessible wayfinding. |
| User/profile section | The sidebar profile card and header controls establish a visible personal workspace context. |
| Project and task cards | The queue uses reusable task rows, task kind labels, completion controls, and an active developer-signal treatment. |
| Progress indicators | Calibrated focus and daily momentum bands present live progress without generic percentage-only bars. |
| Search and filter functionality | The queue filters instantly by task text and by All, Open, or Done state. |
| Responsive design | The full desktop board becomes an ordered, single-column mobile experience, preserving the core controls. |
| Dynamic states | Loading, empty, and error versions of the current queue are available from the queue overflow control. |
| Reusable architecture | The experience is divided into a reusable brand mark, sidebar, typed task data, and a focused home composition. |

## Technology Stack

This frontend uses **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Lucide React**. The static project scaffold also provides accessible UI primitives, including the button component used by the dashboard controls.

## Local Setup

The Task 1 dashboard has no server-side service or required custom secrets. After cloning, install dependencies and run the Vite development server.

```bash
pnpm install
pnpm dev
```

To verify the project before submission, run the type check and production build.

```bash
pnpm run check
pnpm run build
```

The Vite configuration explicitly uses secure HMR through the public preview port, which keeps hot reload functional behind an HTTPS preview proxy.

## Environment Variables

Task 1 is a frontend-only dashboard using typed local mock data, so **no custom environment variables are required**. No `.env` file is needed to run this project. When you connect it to Task 2’s API, document only non-secret public placeholders in `.env.example`, place real local values in an ignored `.env` file, and never commit credentials.

## Project Structure

| Path | Purpose |
| --- | --- |
| `client/src/pages/Home.tsx` | Composes the responsive Soft Signal Studio dashboard and manages local task, filter, timer, and state-preview interactions. |
| `client/src/components/DashboardSidebar.tsx` | Provides the reusable desktop workspace rail, profile block, and focus callout. |
| `client/src/components/DevflowMark.tsx` | Provides the reusable DevFlow icon and wordmark treatment. |
| `client/src/lib/dashboard-data.ts` | Retains typed dashboard data examples for extension during the later API and database tasks. |
| `client/src/index.css` | Defines the global design tokens, animation rules, and reusable Kinetic Workbench annotation treatment. |
| `ideas.md` | Captures the original visual rationale, supplied-reference interpretation, and accepted style decisions. |

## Interaction Notes

The timer is functional: select the orange focus action to start or pause the 28-minute commit-current session, and use Reset to restore it. In the current queue, search by terms such as `Atlas`, `review`, or `API`, then combine the result with the state filters. Each task circle toggles completion. The queue overflow control cycles through loading, empty, error, and live states, making all required dynamic view states easy to demonstrate without an API.

## Demo Walkthrough and LinkedIn Copy

Use [`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md) to record a concise 2–5 minute walkthrough, then customise [`LINKEDIN_POST.md`](./LINKEDIN_POST.md) before publishing. Add your repository, demo video, optional deployment URL, and the official Innovation Hacks LinkedIn tag before submitting.

## Notes for Reviewers

All dashboard content is intentional mock product data for Task 1. The project does not claim to be connected to a backend yet; Tasks 2–4 can replace this data layer with the internship API, persistent database, authentication, and an AI-powered feature.

## License

This project is provided for internship evaluation and portfolio use.
