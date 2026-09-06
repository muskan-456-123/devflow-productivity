# Task 2 Submission Guide — Users, Projects & Tasks API

This guide is the handoff checklist for **Innovation Hacks Full Stack Development Internship — Task 2**. The API is implemented inside the DreamDesk repository and is available under `/api/v1` alongside the existing frontend and tRPC infrastructure.

## Repository Handoff

Use the project’s GitHub repository as the submission source. Before sharing it, confirm that no `.env` file, database credential, OAuth secret, session secret, or private connector value has been committed. The repository should include `server/rest-api.ts`, `server/rest-api.test.ts`, `server/db.ts`, `drizzle/schema.ts`, `API.md`, `ENVIRONMENT.md`, and this guide.

## Local Setup

Install dependencies and start the full-stack development server.

```bash
pnpm install
pnpm dev
```

The full-stack template expects the managed environment variables described in `ENVIRONMENT.md`, including `DATABASE_URL`, `JWT_SECRET`, `VITE_OAUTH_PORTAL_URL`, and the Manus OAuth values. Do not paste production secrets into the repository. A local run without an authenticated session can still show DreamDesk’s local fallback workspace and the API health endpoint.

## Verification Commands

Run the type check, API tests, and production build before recording or submitting.

```bash
pnpm run check
pnpm test -- --runInBand
pnpm run build
```

The verified milestone includes six passing Vitest tests across the authentication and REST API suites, plus a successful combined frontend/server production build.

## Endpoint Demo Flow

Use this order for a concise endpoint walkthrough. The API documentation in [`API.md`](./API.md) contains the full request and response contracts.

| Step | Request | What to demonstrate |
| --- | --- | --- |
| 1 | `GET /api/v1/health` | The service responds with its name and current status. |
| 2 | `POST /api/v1/users` | A validated user is created or upserted using `openId`, name, and email. |
| 3 | `GET /api/v1/users/:id` and `PATCH /api/v1/users/:id` | User retrieval and authenticated profile editing. |
| 4 | `POST /api/v1/projects` | A project is created for the authenticated owner. |
| 5 | `GET /api/v1/projects`, `GET /api/v1/projects/:id`, and `PATCH /api/v1/projects/:id` | Project retrieval, ownership, and updates. |
| 6 | `POST /api/v1/tasks` | A task is created with a validated title, project, priority, and status. |
| 7 | `GET /api/v1/tasks`, `GET /api/v1/tasks/:id`, and `PATCH /api/v1/tasks/:id/status` | Task retrieval and the `todo` → `in_progress` → `done` status flow. |
| 8 | Invalid body, missing auth, wrong owner, and missing id requests | Centralized errors with `400`, `401`, `403`, and `404` responses. |
| 9 | `DELETE /api/v1/tasks/:id`, `DELETE /api/v1/projects/:id`, and `DELETE /api/v1/users/:id` | Safe deletion responses with `204 No Content`. |

For local authenticated requests, the automated suite uses a controlled test identity. In a browser session, the built-in Manus OAuth cookie supplies the authenticated user. For quick API exploration, `API.md` documents the development `x-user-id` fallback accepted by the server when no session cookie is present.

## DreamDesk Dashboard Demonstration

The frontend now requests persisted projects and tasks through `client/src/lib/api.ts`. When a valid session and database are present, the HUD shows **Live workspace**. When the account has no projects, it shows **No projects yet**. If the backend is unreachable, the room preserves the local experience and shows **Offline · local view**. If authentication is unavailable, the normal fallback is **Demo workspace**.

For a deterministic recording without seeding a database, use these preview URLs:

```text
/?apiState=loading
/?apiState=connected
/?apiState=empty
/?apiState=fallback
/?apiState=error
```

These controlled previews make the required loading, connected, empty, fallback, and error states visible in the DreamDesk HUD. They are review aids only; the live dashboard still attempts the real API path when no preview parameter is present.

## Suggested Demo Video Structure

Keep the recording between three and five minutes. Begin with the repository and `API.md`, show the health endpoint, create a user and project, create and update a task status, then show one validation error and one ownership/not-found error. Finish in DreamDesk with the connected-state pill and the controlled state previews. Mention that Task 1’s room remains usable without authentication while Task 2’s REST path is ready for the persistent platform.

## Submission Notes

The final project checkpoint is the stable reviewable version of the Task 2 implementation. Attach the repository link, API documentation link, and demo video link to the internship submission. Use the LinkedIn post template only after replacing its placeholders with the final repository and recording URLs.
