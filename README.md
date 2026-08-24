# DevFlow — Developer Productivity Dashboard

DevFlow is a responsive developer productivity dashboard created for **Innovation Hacks Full Stack Development Internship — Task 1**. It demonstrates a complete frontend product experience: accessible navigation, project and task visibility, progress tracking, client-side search and filters, and meaningful loading, empty, and error states.

The experience is intentionally designed as a **Kinetic Workbench** rather than a generic admin template. Its warm mineral canvas, ink-navy information hierarchy, and Flow Orange momentum signals make day-to-day engineering work feel structured, visible, and human.

## Visual Preview

| Desktop workspace | Mobile workspace |
| --- | --- |
| ![DevFlow desktop dashboard](https://files.manuscdn.com/user_upload_by_module/session_file/310519663870362017/VhtwUYvFdBdUXUuv.png) | ![DevFlow mobile dashboard](https://files.manuscdn.com/user_upload_by_module/session_file/310519663870362017/aMYTlCtbogurqRia.png) |

## What It Demonstrates

| Requirement | Implementation in DevFlow |
| --- | --- |
| Dashboard landing page | A focused daily workspace with a task queue, active projects, weekly trace, focus recommendation, and next-dispatch prompt. |
| Accessible navigation | A persistent desktop work rail plus a mobile navigation drawer, with clear active states and descriptive labels. |
| User/profile section | A compact profile control and notification indicator sit in the workspace header. |
| Project and task cards | Reusable project cards, a task row component, status pills, avatars, and a common segmented-progress pattern create a consistent visual system. |
| Progress indicators | Segmented progress bands appear in project runways and daily completion signals; a calibrated focus meter reinforces the active work block. |
| Search and filtering | The task queue filters instantly by search term, project, and status. Project cards also become active filters. |
| Responsive design | The desktop rail collapses into a mobile header; the canvas becomes a clear, single-column workboard at smaller viewports. |
| Dynamic states | The queue includes visible loading, empty, and error states. Use the queue overflow menu to preview each state. |
| Reusable architecture | Components are divided into navigation, brand mark, project card, segmented progress, task panel, and the home composition. |

## Technology Stack

This frontend is built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Lucide React**. The static project scaffold also includes accessible UI primitives, including the button component used for key controls.

## Local Setup

The project has no server-side services or required runtime secrets for Task 1. After cloning, install dependencies and run the development server.

```bash
pnpm install
pnpm dev
```

The development server runs on the displayed local Vite URL. To verify the project before submission, run the type check and production build.

```bash
pnpm run check
pnpm run build
```

## Environment Variables

Task 1 is a frontend-only dashboard using local mock data, so **no custom environment variables are required**. No `.env` file is needed to run this project. When you begin the API and database tasks, add only non-secret placeholders to `.env.example` and provide real local values through an ignored `.env` file; never commit credentials.

## Project Structure

| Path | Purpose |
| --- | --- |
| `client/src/pages/Home.tsx` | Assembles the responsive dashboard and manages local interaction state. |
| `client/src/components/DashboardSidebar.tsx` | Implements the desktop work rail and navigation states. |
| `client/src/components/TaskPanel.tsx` | Provides search, filters, task completion, and loading/empty/error state previews. |
| `client/src/components/ProjectCard.tsx` | Provides the project runway card treatment and project filter action. |
| `client/src/components/SegmentedProgress.tsx` | Reusable visual progress indicator. |
| `client/src/components/DevflowMark.tsx` | Reusable DevFlow brand mark and wordmark. |
| `client/src/lib/dashboard-data.ts` | Typed task, project, navigation, and trend data used by the frontend. |
| `client/src/index.css` | Global tokens and the engineering-workbench visual material language. |
| `ideas.md` | Recorded design rationale and accepted visual decisions. |

## Interaction Notes

The task queue is intentionally functional, not merely decorative. Enter a keyword such as `Atlas`, `API`, or `Ava` into search; then combine it with the status controls. Selecting a project runway card filters the queue to that project. The checkbox in each task row marks the task complete and updates the daily completion signal. The overflow menu in the task queue exposes loading, empty, and error state previews so the expected product states can be demonstrated without needing an API.

## Demo Walkthrough

Use [`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md) for a concise 2–5 minute recording plan. It demonstrates the responsive layout, project filtering, task search, status filters, task completion action, and dynamic state handling required by the task guide.

## LinkedIn Submission Copy

Use [`LINKEDIN_POST.md`](./LINKEDIN_POST.md) as a customisable post template. Before publishing, add the final deployment link if available, tag the official Innovation Hacks LinkedIn page, and attach one of the dashboard screenshots above.

## Notes for Reviewers

All dashboard content is intentional mock product data for Task 1. The dashboard does not claim to connect to a backend yet; Tasks 2–4 can replace this data layer with the internship API, persistent database, authentication, and an AI capability.

## License

This project is provided for internship evaluation and portfolio use.
