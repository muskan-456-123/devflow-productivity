# Task 1 Delivery Checklist

## Reference-inspired redesign

- [x] Repair the development preview WebSocket connection and confirm preview reloads correctly.
- [x] Recompose the dashboard into an original visual workspace with a daily overview, upcoming task list, focus timer, calendar, and profile rail.
- [x] Preserve distinct DevFlow branding, original artwork, copy, and interaction states while using the reference only for broad layout inspiration.
- [x] Verify the refreshed desktop and mobile layouts, then update project documentation and save a delivery checkpoint.

## DreamDesk interactive dashboard foundation

- [x] Record the original cozy-study visual target, room objects, interaction map, and 3D implementation risks.
- [x] Add the interactive 3D room engine and a lifecycle-safe full-screen canvas shell.
- [x] Create original DreamDesk visual assets and a procedural cozy study with a desk, computer, calendar, focus clock, bookshelf, plant, coffee cup, window, and room statistics.
- [x] Implement initial object selection, contextual tooltips, task panel, calendar panel, focus timer panel, and environment mood controls.
- [x] Verify desktop and tablet rendering, keyboard and pointer interactions, and the initial dashboard milestone.

## DreamDesk lighting refinement

- [x] Reduce the room’s broad ambient brightness and eliminate the blown-out left-side lighting.
- [x] Make Night Mode a distinct dark-blue scene with a warm desk-lamp pool of light and subtle night-window atmosphere.
- [x] Strengthen bottom dock and HUD text contrast across the room moods.
- [x] Verify the default and Night Mode scenes at desktop and tablet widths, then save the refined checkpoint.

## DreamDesk room progression

- [x] Define earned room-upgrade milestones tied to completed task counts.
- [x] Add visible 3D upgrades for the laptop, chair, desk décor, plant, and premium room atmosphere.
- [x] Show progress, the next unlock, and an earned-upgrade moment in the HUD when a task is completed.
- [x] Verify the base, mid-progress, and fully upgraded room states at desktop and tablet widths.

- [x] Implement the responsive dashboard home view with a persistent desktop work rail and mobile navigation.
- [x] Build reusable navigation, profile, project, task, progress, filter, and state components.
- [x] Add client-side task search, project/status filters, task completion actions, and contextual feedback.
- [x] Include loading, empty, and error states for the dynamic task area.
- [x] Add responsive behavior for mobile, tablet, and desktop layouts.
- [x] Create a GitHub-ready README with setup, technology stack, feature mapping, screenshots, and demo guidance.
- [x] Validate the build and review the rendered dashboard at desktop and mobile widths.
- [x] Prepare the final project checkpoint and submission guidance for the GitHub repository, demo video, and LinkedIn post.

## Task 2 — Backend & REST API

- [x] Upgrade the static project to the full-stack web-db-user capability.
- [x] Define users, projects, and tasks schema with relationships and status fields.
- [x] Implement user management, project retrieval/creation, and task CRUD operations.
- [x] Add validation for every write operation and centralized error handling.
- [x] Enforce meaningful HTTP status codes and task status transitions.
- [x] Add environment configuration and secrets guidance without committing credentials.
- [x] Write API documentation and endpoint examples.
- [x] Add automated API tests and verify the dashboard data path.
- [ ] Save a final Task 2 checkpoint and prepare backend submission guidance.

- [x] Add automated tests for successful user, project, and task create/read/update/delete flows, task status updates, ownership, and not-found cases.
- [x] Connect the DreamDesk dashboard task/project data path to the backend and verify loading, success, empty, and error states against API responses.
- [x] Add REST coverage for user read/update, project read/update, task read, user/project/task not-found cases, and clarify user deletion support.
- [x] Add a user delete endpoint or explicitly document why user deletion is excluded from the authenticated user-management contract.
- [x] Render visible DreamDesk backend-state feedback for loading, connected, empty, fallback, and error API responses.
- [x] Add a deterministic API-state verification path for the dashboard and capture each state before the final checkpoint.
