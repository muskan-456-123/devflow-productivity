# DreamDesk Architecture

DreamDesk follows the browser-room layering model: **React frames the experience, Babylon renders the room, and the world controller owns room interaction rules.** The initial implementation is intentionally compact, with no imported models or physics engine.

```text
client/src/
├── components/
│   ├── GameCanvas.tsx            # React-safe Babylon lifecycle and full-screen canvas
│   └── dreamdesk/
│       ├── DreamDeskHUD.tsx      # Floating navigation, stats, tooltips, and drawer shell
│       └── ProductivityPanels.tsx # Tasks, calendar, focus, notes, habits, break, mood panels
├── game/
│   ├── scene.ts                  # createGameScene entry point and GameHandle contract
│   ├── DreamDeskWorld.ts         # Scene setup, camera targets, object selection, and disposal
│   ├── roomFactory.ts            # Procedural room, furniture, props, and sky construction
│   └── moodSystem.ts             # Named room mood palettes and material/light application
├── lib/
│   └── dreamdesk-data.ts         # Typed productivity data, stat chips, object metadata
└── pages/
    └── Home.tsx                  # React picture frame: canvas plus connected HUD
```

## Ownership

| Owner | Responsibilities |
| --- | --- |
| `GameCanvas` | Creates and disposes the Babylon engine once, handles resize, and passes scene events upward. |
| `DreamDeskWorld` | Owns semantic interactable meshes, selection, camera-target transitions, cloud/steam animation, and cleanup. |
| `roomFactory` | Creates all procedural furniture and décor meshes from readable helper functions. |
| `moodSystem` | Applies named Morning, Sunset, Night, Rain, and Cozy palettes to room materials, sky, and lights. |
| React HUD | Owns panels, keyboard-accessible navigation, task completion UI, timer controls, mood control, and tooltips. |

The world also exposes `setProgress(completedCount)`. React calculates completed task count from typed task state and passes it to the canvas. `DreamDeskWorld` maps the count to procedural upgrade meshes and signals the current chapter back to the HUD; React remains the source of truth for completion status.

## Interaction Contract

Each room object is named with a stable semantic key: `computer`, `calendar`, `pomodoro`, `bookshelf`, `plant`, `coffee`, and `window`. The world emits `onSelect(key)` and `onHover(key | null)`. React maps keys to panel content, while the world maps the same keys to camera targets and visual halos. This keeps productivity rules out of mesh metadata and keeps the room reusable.

## Asset Hints

The visible room is built from procedural meshes and materials to avoid a brittle GLB import pipeline. The generated visual target is an art-direction reference shown only in development documentation; it is not used as an environment texture. The production room retains its own original geometry and interaction affordances.
