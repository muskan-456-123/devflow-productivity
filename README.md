# DreamDesk — Interactive Productivity Room

DreamDesk is an original **interactive 3D productivity room** built for the Innovation Hacks Full Stack Development Internship. Instead of presenting productivity as a conventional grid of cards, it turns a cozy study into the dashboard: the desk computer opens tasks, the paper calendar opens scheduling, the pomodoro clock starts focus time, the bookshelf keeps notes, the plant tracks habits, the coffee cup starts a break, the window changes the room’s mood, and the wall board presents work statistics.

The current milestone delivers the fully interactive **DreamDesk dashboard foundation**: a responsive browser room built with Babylon.js, accessible HTML panels, typed task data, mood controls, an original visual direction, and visible Task 1 states.

## Earned Room Progression

Completed tasks now make the room itself more beautiful. The current chapter appears in the lower-left **Room Chapter** card, and the computer task list is the source of truth for the upgrades.

| Completed tasks | Chapter | Room change |
| --- | --- | --- |
| 1 | Screen Bloom | A warmer laptop screen and lit keyboard come online. |
| 2 | Green Corner | The plant grows extra leaves and a small book stack arrives. |
| 3 | Better Seat | The chair gains a lavender cushion and supportive headrest. |
| 4 | Collected Desk | A pencil cup and desk card personalise the workspace. |
| 5 | Skyline Finish | Window lights and floating sky motes complete the room. |

Completing a task gives a concise earned-upgrade message. Reopening a task rolls the corresponding room upgrade back, so the room always reflects the actual completed-task count. For deterministic review, append `?progress=0` through `?progress=5` to preview any room chapter.

## Experience Preview

DreamDesk is designed as a warm, elevated diorama study with a twilight cloud view, lavender and cream materials, blush-pink details, and amber action cues. It is inspired by the supplied cozy-workspace references only at a broad mood level; the room geometry, visual assets, name, interactions, and productivity content are original.

## Room Interaction Map

| Room object | Dashboard action | Included interaction |
| --- | --- | --- |
| Computer | Tasks & Projects | Search, state filters, task completion, and loading/empty/error previews. |
| Desk calendar | Calendar | Monthly date board and upcoming review cards. |
| Pomodoro clock | Focus | Functional 25-minute start, pause, and reset controls. |
| Bookshelf | Notes | Curated reference notes and note capture affordance. |
| Plant | Habits | A small habit interaction with a seven-day rhythm display. |
| Coffee cup | Break Mode | A deliberate seven-minute break control. |
| Sky window | Room moods | Morning, Sunset, Night, Rain, and Cozy scene palettes. |
| Wall board | Statistics | Open threads, streak, completed loops, and weekly rhythm. |

## Interaction Design

Hovering a supported room object shows an in-scene highlight and contextual label. Selecting an object focuses the Babylon camera toward its location and opens the matching accessible glass panel. The compact dock provides a keyboard-friendly alternative to the same controls. Use the close button in a panel, or select **Home** in the dock, to return to the full-room overview.

For deterministic visual review, append `?demo` to open Tasks on load, or use a targeted view such as `?demo=pomodoro`, `?demo=window`, or `?demo=statistics`.

## Technology Stack

DreamDesk is built with **React 19**, **TypeScript**, **Vite**, **Babylon.js**, **Tailwind CSS 4**, and **Lucide React**. React owns the accessible user interface; Babylon owns the procedural room, camera, lights, interactive meshes, object highlights, and gentle prop animation.

## Local Setup

DreamDesk has no required custom environment variables or backend service at this milestone. Install packages and run the Vite development server.

```bash
pnpm install
pnpm dev
```

Use the following commands before submitting changes.

```bash
pnpm run check
pnpm run build
```

## Structure

| Path | Purpose |
| --- | --- |
| `client/src/components/GameCanvas.tsx` | Lifecycle-safe React wrapper for the full-screen Babylon canvas. |
| `client/src/game/DreamDeskWorld.ts` | Camera focus, object selection, scene mood, task-driven room upgrades, prop animation, and cleanup. |
| `client/src/game/roomFactory.ts` | Procedural study-room furniture, clickable objects, room-upgrade meshes, highlights, and window scene. |
| `client/src/components/dreamdesk/DreamDeskHUD.tsx` | Glass navigation, profile, greeting, context tooltip, and stats chips. |
| `client/src/components/dreamdesk/ProductivityPanels.tsx` | Accessible task, calendar, focus, notes, habits, break, mood, and statistics panels. |
| `client/src/lib/dreamdesk-data.ts` | Typed room destinations, mood names, navigation, and task data. |
| `PLAN.md` | Interaction risks and concrete verification criteria. |
| `STRUCTURE.md` | Rendering, UI, and world ownership boundaries. |
| `ASSETS.md` | Generated visual direction and the procedural room-asset map. |
| `PROGRESSION.md` | The complete milestone-by-milestone room-upgrade plan. |

## What Comes Next

This first milestone deliberately avoids imported 3D models, free-roaming controls, audio autoplay, physics, and full game-like progression so the core room remains fast and reliable. The next expansion can add true mood effects such as rain particles, a deeper notes editor, browser-saved task state, productivity-driven room progression, and gesture-unlocked ambient sound.

## Task 2 Submission

The complete backend handoff checklist, including environment setup, endpoint demo flow, verification commands, deterministic DreamDesk API-state previews, and recording guidance is in [`TASK2_SUBMISSION.md`](./TASK2_SUBMISSION.md). Endpoint contracts remain in [`API.md`](./API.md), and environment details are in [`ENVIRONMENT.md`](./ENVIRONMENT.md).

## License

This project is provided for internship evaluation and portfolio use.

## Task 2 Backend

The project now includes a database-backed REST API under `/api/v1` for users, projects, and tasks. It includes ownership-aware project and task access, write validation, explicit task status updates, centralized error envelopes, and meaningful HTTP status codes. See [`API.md`](./API.md) for the endpoint reference and curl examples, and [`ENVIRONMENT.md`](./ENVIRONMENT.md) for configuration and secret-handling guidance.

Run `pnpm run check`, `pnpm test`, and `pnpm run build` before submitting the backend milestone.
