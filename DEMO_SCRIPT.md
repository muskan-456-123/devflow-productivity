# DevFlow Task 1 — Demo Video Script

This script is designed for a **2–5 minute** screen-recorded walkthrough. It explains both the visible product decisions and the frontend engineering choices that Innovation Hacks asks reviewers to evaluate.

## Recording Setup

Open the DevFlow dashboard at desktop width first. Keep the browser address bar hidden if possible, use a readable zoom level, and avoid background notifications. Then resize to a narrow mobile viewport for the responsive segment.

## Suggested Narration

| Time | Screen action | Narration |
| --- | --- | --- |
| 0:00–0:25 | Start on the desktop dashboard and pause on the overall page. | “This is DevFlow, a Developer Productivity Dashboard built for Innovation Hacks Task 1. I designed it as a Kinetic Workbench, so the interface uses an engineering-notebook system rather than a generic admin layout.” |
| 0:25–0:55 | Point out the work rail, profile control, focus block, and project runway. | “The main dashboard includes accessible navigation, a profile area, a daily focus recommendation, active projects, task progress, and weekly productivity information. Flow Orange consistently marks active momentum and next actions.” |
| 0:55–1:30 | Click the Atlas project card, then search for `keyboard` or `API`. | “The task queue is interactive. Project cards filter the queue, and search filters against task title, project, tags, and assignee immediately on the client.” |
| 1:30–1:55 | Select a status filter such as Ready, then clear it. | “Status controls work alongside search and project filters, so the component supports realistic combined filtering rather than only static cards.” |
| 1:55–2:20 | Mark a task complete with its checkbox. | “Completing a task updates the task state and the daily completion signal in the right rail, demonstrating local state management and a responsive product interaction.” |
| 2:20–2:55 | Open the queue overflow menu and select Loading, Empty, then Error. | “The dashboard includes deliberate loading, empty, and error states. I included a state preview control so each condition is easy to test and demonstrate.” |
| 2:55–3:25 | Resize to mobile width and open the mobile menu. | “On mobile, the desktop rail becomes a compact header and navigation drawer. The dashboard reduces to a single-column reading order while preserving the key controls and task interactions.” |
| 3:25–3:45 | End on the complete dashboard. | “The frontend uses React, TypeScript, Tailwind CSS, and reusable components for the navigation, projects, progress bands, task queue, and dashboard shell. Tasks 2 through 4 can replace the current mock data with the API and database layers.” |

## Final Frame

End with the dashboard at desktop width, with the task queue visible. Add your repository URL and optional deployment URL as text in the video description rather than on the dashboard itself.
