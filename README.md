# DreamDesk — Interactive Productivity Room

DreamDesk is an original **interactive 3D productivity room** built for the Innovation Hacks Full Stack Development Internship. Instead of presenting productivity as a conventional grid of cards, it turns a cozy study into the dashboard: the desk computer opens tasks, the paper calendar opens scheduling, the pomodoro clock starts focus time, the bookshelf keeps notes, the plant tracks habits, the coffee cup starts a break, the window changes the room’s mood, and the wall board presents work statistics.

The current milestone delivers the fully interactive **DreamDesk dashboard foundation**: a responsive browser room built with Babylon.js, accessible HTML panels, typed task data, mood controls, an original visual direction, and visible Task 1 states.

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
| `client/src/game/DreamDeskWorld.ts` | Camera focus, object selection, scene mood, prop animation, and cleanup. |
| `client/src/game/roomFactory.ts` | Procedural study-room furniture, clickable objects, highlights, and window scene. |
| `client/src/components/dreamdesk/DreamDeskHUD.tsx` | Glass navigation, profile, greeting, context tooltip, and stats chips. |
| `client/src/components/dreamdesk/ProductivityPanels.tsx` | Accessible task, calendar, focus, notes, habits, break, mood, and statistics panels. |
| `client/src/lib/dreamdesk-data.ts` | Typed room destinations, mood names, navigation, and task data. |
| `PLAN.md` | Interaction risks and concrete verification criteria. |
| `STRUCTURE.md` | Rendering, UI, and world ownership boundaries. |
| `ASSETS.md` | Generated visual direction and the procedural room-asset map. |

## What Comes Next

This first milestone deliberately avoids imported 3D models, free-roaming controls, audio autoplay, physics, and full game-like progression so the core room remains fast and reliable. The next expansion can add true mood effects such as rain particles, a deeper notes editor, browser-saved task state, productivity-driven room progression, and gesture-unlocked ambient sound.

## License

This project is provided for internship evaluation and portfolio use.
