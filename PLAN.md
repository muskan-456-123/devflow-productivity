# Game Plan: DreamDesk

DreamDesk is an original browser-based productivity room. The first milestone replaces the conventional dashboard with an interactive cozy study: users select room objects to open Tasks, Calendar, Focus, Notes, Habits, Break, and room-mood controls.

## Risk Tasks

### 1. Object picking and contextual camera focus

- **Why isolated:** A productivity room only feels interactive when pointer targets remain reliable across nested meshes, overlays, and canvas resizing. Camera movement must also focus the selected object without losing the overall room context.
- **Approach:** Use semantic `InteractiveObject` definitions and Babylon mesh action managers. Keep selection state in one `DreamDeskWorld` controller. Start with deterministic camera target interpolation rather than pointer-lock, collisions, or free-roaming movement.
- **Verify:** Hovering the computer, calendar, focus clock, bookshelf, plant, coffee cup, and window shows a tooltip. Selecting each object visibly moves the camera target and opens the matching React panel; closing the panel restores the overview target.

### 2. Lifecycle-safe Babylon canvas in React

- **Why isolated:** React 19 development mode can mount effects more than once. Duplicate render loops or event listeners leave a black canvas, stacked animations, or an unresponsive page.
- **Approach:** Initialise the Babylon Engine once in `GameCanvas`, create the scene through a single `createGameScene` entry point, and dispose the engine, scene resources, and listeners on unmount.
- **Verify:** Refreshing and resizing the preview retains exactly one working canvas, room animations continue without duplication, and the browser console shows no WebGL, HMR, or runtime errors attributable to the room.

## Main Build

The first DreamDesk room uses procedural geometry for a lightweight, reliable diorama. It includes a desk, laptop, calendar, pomodoro clock, coffee cup, plant, bookshelf, window, chair, floor, wall panel, lamp, clouds, and floating stat chips. Its palette starts in a warm sunset mood and can switch among Morning, Sunset, Night, Rain, and Cozy. A concise floating navigation bar provides an alternate keyboard-friendly route to the same dashboards.

- **Assets needed:** A single generated visual target as the art-direction anchor. Room structure, props, clouds, glow halos, particles, UI glass panels, and iconography are procedural or use existing Lucide icons.
- **Verify:**
  - Every planned room object is visible at the target camera angle and carries a distinct hover state.
  - Selecting each available object opens the correct Tasks, Calendar, Focus, Notes, Habits, Break, or Mood panel.
  - The focus panel starts, pauses, and resets a 25-minute timer; the task panel supports completion controls.
  - Mood selection visibly changes sky, lights, and ambient material colors.
  - The canvas and overlays remain usable at desktop and tablet widths with no clipped interactive controls.
  - No missing textures, fallback materials, console errors, or visual clipping appear in the final preview.
  - The room preserves the generated visual target’s elevated isometric composition, lavender/cream/blush palette, and cozy developer-study density.
  - A `?demo` state opens the room with the Task computer selected, so the main gameplay/dashboard interaction is visible in deterministic screenshot review.
